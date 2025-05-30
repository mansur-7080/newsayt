/**
 * MessageBus - Reactive Systems Pattern
 * Mikroservislar orasida asinxron xabar almashish
 */

const EventEmitter = require('events');

class MessageBus extends EventEmitter {
  constructor() {
    super();
    this.channels = new Map(); // Xabar kanallari
    this.subscribers = new Map(); // Obunachillar
    this.messageQueue = new Map(); // Xabarlar navbati
    this.deadLetterQueue = []; // Yetkazilmagan xabarlar
    this.middlewares = []; // Xabar o'rta dasturlari
  }

  /**
   * Yangi kanal yaratish
   * @param {string} channelName 
   * @param {Object} options 
   */
  createChannel(channelName, options = {}) {
    if (this.channels.has(channelName)) {
      throw new Error(`${channelName} kanali allaqachon mavjud`);
    }

    const channel = {
      name: channelName,
      created: new Date(),
      options: {
        persistent: options.persistent || false,
        maxRetries: options.maxRetries || 3,
        retryDelay: options.retryDelay || 1000,
        ttl: options.ttl || null // Time to live
      },
      stats: {
        messagesSent: 0,
        messagesReceived: 0,
        errors: 0
      }
    };

    this.channels.set(channelName, channel);
    this.messageQueue.set(channelName, []);

    return channel;
  }

  /**
   * Kanalga obuna bo'lish
   * @param {string} channelName 
   * @param {string} subscriberId 
   * @param {Function} handler 
   * @param {Object} options 
   */
  subscribe(channelName, subscriberId, handler, options = {}) {
    if (!this.channels.has(channelName)) {
      this.createChannel(channelName);
    }

    const subscription = {
      id: subscriberId,
      handler,
      options: {
        filter: options.filter || null,
        async: options.async !== false,
        priority: options.priority || 0
      },
      created: new Date(),
      messageCount: 0
    };

    if (!this.subscribers.has(channelName)) {
      this.subscribers.set(channelName, new Map());
    }

    this.subscribers.get(channelName).set(subscriberId, subscription);

    // Navbatdagi xabarlarni yuborish
    this._processQueue(channelName);

    return () => this.unsubscribe(channelName, subscriberId);
  }

  /**
   * Obunani bekor qilish
   * @param {string} channelName 
   * @param {string} subscriberId 
   */
  unsubscribe(channelName, subscriberId) {
    if (this.subscribers.has(channelName)) {
      this.subscribers.get(channelName).delete(subscriberId);
    }
  }

  /**
   * Xabar yuborish
   * @param {string} channelName 
   * @param {Object} message 
   * @param {Object} options 
   */
  async publish(channelName, message, options = {}) {
    if (!this.channels.has(channelName)) {
      this.createChannel(channelName);
    }

    const envelope = {
      id: this._generateMessageId(),
      channelName,
      message,
      metadata: {
        publishedAt: new Date(),
        publisher: options.publisher || 'anonymous',
        correlationId: options.correlationId || null,
        replyTo: options.replyTo || null,
        priority: options.priority || 0,
        ttl: options.ttl || null
      },
      attempts: 0
    };

    // Middleware'larni qo'llash
    for (const middleware of this.middlewares) {
      envelope.message = await middleware(envelope.message, envelope.metadata);
    }

    // Kanal statistikasini yangilash
    this.channels.get(channelName).stats.messagesSent++;

    // Xabarni yuborish
    await this._deliverMessage(channelName, envelope);

    return envelope.id;
  }

  /**
   * Request-Reply pattern
   * @param {string} channelName 
   * @param {Object} message 
   * @param {number} timeout 
   */
  async request(channelName, message, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const correlationId = this._generateMessageId();
      const replyChannel = `reply_${correlationId}`;

      // Javob kutish
      const timer = setTimeout(() => {
        this.unsubscribe(replyChannel, 'requester');
        reject(new Error('Request timeout'));
      }, timeout);

      // Javob olish
      this.subscribe(replyChannel, 'requester', (reply) => {
        clearTimeout(timer);
        this.unsubscribe(replyChannel, 'requester');
        resolve(reply);
      });

      // So'rov yuborish
      this.publish(channelName, message, {
        correlationId,
        replyTo: replyChannel
      });
    });
  }

  /**
   * Fanout pattern - bir nechta kanallarga yuborish
   * @param {string[]} channelNames 
   * @param {Object} message 
   */
  async fanout(channelNames, message) {
    const results = await Promise.allSettled(
      channelNames.map(channel => this.publish(channel, message))
    );

    return results.map((result, index) => ({
      channel: channelNames[index],
      success: result.status === 'fulfilled',
      messageId: result.value,
      error: result.reason
    }));
  }

  /**
   * Topic-based routing
   * @param {string} topic 
   * @param {Object} message 
   */
  async publishToTopic(topic, message) {
    const matchingChannels = Array.from(this.channels.keys())
      .filter(channel => this._matchTopic(channel, topic));

    return this.fanout(matchingChannels, message);
  }

  /**
   * Middleware qo'shish
   * @param {Function} middleware 
   */
  use(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Kanal statistikasi
   * @param {string} channelName 
   */
  getChannelStats(channelName) {
    if (!this.channels.has(channelName)) {
      return null;
    }

    const channel = this.channels.get(channelName);
    const subscribers = this.subscribers.get(channelName) || new Map();

    return {
      ...channel.stats,
      subscriberCount: subscribers.size,
      queueSize: (this.messageQueue.get(channelName) || []).length
    };
  }

  // Private metodlar
  async _deliverMessage(channelName, envelope) {
    const channelSubscribers = this.subscribers.get(channelName);
    
    if (!channelSubscribers || channelSubscribers.size === 0) {
      // Obunachillar yo'q - navbatga qo'shish
      this.messageQueue.get(channelName).push(envelope);
      return;
    }

    // Priority bo'yicha saralash
    const sortedSubscribers = Array.from(channelSubscribers.values())
      .sort((a, b) => b.options.priority - a.options.priority);

    for (const subscriber of sortedSubscribers) {
      try {
        // Filter qo'llash
        if (subscriber.options.filter && !subscriber.options.filter(envelope.message)) {
          continue;
        }

        // Xabarni yetkazish
        if (subscriber.options.async) {
          setImmediate(() => {
            subscriber.handler(envelope.message, envelope.metadata);
          });
        } else {
          await subscriber.handler(envelope.message, envelope.metadata);
        }

        subscriber.messageCount++;
        this.channels.get(channelName).stats.messagesReceived++;

      } catch (error) {
        this.channels.get(channelName).stats.errors++;
        envelope.attempts++;

        // Retry logic
        if (envelope.attempts < this.channels.get(channelName).options.maxRetries) {
          setTimeout(() => {
            this._deliverMessage(channelName, envelope);
          }, this.channels.get(channelName).options.retryDelay * envelope.attempts);
        } else {
          // Dead letter queue
          this.deadLetterQueue.push({
            envelope,
            error: error.message,
            failedAt: new Date()
          });
        }
      }
    }
  }

  _processQueue(channelName) {
    const queue = this.messageQueue.get(channelName) || [];
    const messages = [...queue];
    this.messageQueue.set(channelName, []);

    messages.forEach(envelope => {
      this._deliverMessage(channelName, envelope);
    });
  }

  _generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  _matchTopic(channel, topic) {
    // Simple topic matching (e.g., user.* matches user.created, user.updated)
    const pattern = topic.replace(/\*/g, '.*').replace(/\./g, '\\.');
    return new RegExp(`^${pattern}$`).test(channel);
  }
}

// Singleton instance
const messageBus = new MessageBus();

module.exports = messageBus; 