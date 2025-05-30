/**
 * StreamProcessor - Reactive Systems
 * Kafka stream processing va real-time data transformation
 */

const { Transform, Readable, Writable } = require('stream');
const EventEmitter = require('events');

class StreamProcessor extends EventEmitter {
  constructor(kafkaClient, redisClient) {
    super();
    this.kafka = kafkaClient;
    this.redis = redisClient;
    this.processors = new Map();
    this.topics = new Map();
    this.windows = new Map();
    this.state = 'initialized';
  }

  /**
   * Stream processor'ni boshlash
   */
  async start() {
    console.log('🚀 Starting Stream Processor...');
    this.state = 'starting';

    try {
      // Kafka consumer groups yaratish
      await this._initializeConsumerGroups();
      
      // State store'larni boshlash
      await this._initializeStateStores();
      
      // Window'larni boshlash
      await this._initializeWindows();
      
      this.state = 'running';
      this.emit('processor:started');
      console.log('✅ Stream Processor started');

    } catch (error) {
      this.state = 'error';
      this.emit('processor:error', error);
      throw error;
    }
  }

  /**
   * Stream topology yaratish
   */
  createStream(name, config) {
    const stream = {
      name,
      source: config.source,
      sink: config.sink,
      transformations: [],
      filters: [],
      aggregations: [],
      joins: [],
      windows: config.windows || []
    };

    // Transform stream yaratish
    const transformStream = new Transform({
      objectMode: true,
      transform: async (data, encoding, callback) => {
        try {
          let result = data;
          
          // Filter'larni qo'llash
          for (const filter of stream.filters) {
            if (!await filter(result)) {
              return callback(); // Skip this record
            }
          }
          
          // Transformation'larni qo'llash
          for (const transform of stream.transformations) {
            result = await transform(result);
          }
          
          // Aggregation'larni qo'llash
          for (const aggregation of stream.aggregations) {
            result = await this._applyAggregation(aggregation, result);
          }
          
          callback(null, result);
          
        } catch (error) {
          callback(error);
        }
      }
    });

    stream.processor = transformStream;
    this.processors.set(name, stream);
    
    return this;
  }

  /**
   * Filter qo'shish
   */
  filter(streamName, predicate) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    stream.filters.push(predicate);
    return this;
  }

  /**
   * Map transformation
   */
  map(streamName, mapper) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    stream.transformations.push(mapper);
    return this;
  }

  /**
   * FlatMap transformation
   */
  flatMap(streamName, flatMapper) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    const flatMapTransform = async (data) => {
      const results = await flatMapper(data);
      return Array.isArray(results) ? results : [results];
    };
    
    stream.transformations.push(flatMapTransform);
    return this;
  }

  /**
   * GroupBy operation
   */
  groupBy(streamName, keySelector) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    const groupByTransform = async (data) => {
      const key = await keySelector(data);
      return {
        key,
        value: data,
        timestamp: Date.now()
      };
    };
    
    stream.transformations.push(groupByTransform);
    return this;
  }

  /**
   * Window aggregation
   */
  window(streamName, windowType, size, slide) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    const window = {
      type: windowType, // tumbling, sliding, session
      size, // window size in ms
      slide: slide || size, // slide interval for sliding windows
      store: new Map(),
      watermark: Date.now()
    };
    
    stream.windows.push(window);
    this.windows.set(`${streamName}_${windowType}`, window);
    
    return this;
  }

  /**
   * Aggregate operation
   */
  aggregate(streamName, initialValue, aggregator, windowName) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    const aggregation = {
      initialValue,
      aggregator,
      windowName,
      state: new Map()
    };
    
    stream.aggregations.push(aggregation);
    return this;
  }

  /**
   * Join two streams
   */
  join(leftStream, rightStream, joinKey, joinWindow, joiner) {
    const left = this.processors.get(leftStream);
    const right = this.processors.get(rightStream);
    
    if (!left || !right) {
      throw new Error('Both streams must exist for join');
    }
    
    const joinConfig = {
      leftStream,
      rightStream,
      joinKey,
      joinWindow,
      joiner,
      leftBuffer: [],
      rightBuffer: []
    };
    
    // Join processor yaratish
    const joinProcessor = new Transform({
      objectMode: true,
      transform: async (data, encoding, callback) => {
        try {
          const key = await joinKey(data);
          const currentTime = Date.now();
          
          // Buffer'ga qo'shish
          if (data.stream === leftStream) {
            joinConfig.leftBuffer.push({ key, data, timestamp: currentTime });
          } else {
            joinConfig.rightBuffer.push({ key, data, timestamp: currentTime });
          }
          
          // Window tashqarisidagi ma'lumotlarni tozalash
          this._cleanJoinBuffers(joinConfig, currentTime);
          
          // Join qilish
          const results = await this._performJoin(joinConfig, key, data);
          
          for (const result of results) {
            callback(null, result);
          }
          
        } catch (error) {
          callback(error);
        }
      }
    });
    
    left.joins.push(joinConfig);
    right.joins.push(joinConfig);
    
    return joinProcessor;
  }

  /**
   * State store operations
   */
  async getState(storeName, key) {
    const storeKey = `${storeName}:${key}`;
    const value = await this.redis.get(storeKey);
    return value ? JSON.parse(value) : null;
  }

  async setState(storeName, key, value) {
    const storeKey = `${storeName}:${key}`;
    await this.redis.set(storeKey, JSON.stringify(value));
  }

  /**
   * Complex Event Processing (CEP)
   */
  detectPattern(streamName, pattern, action) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    const patternDetector = {
      pattern, // e.g., {sequence: ['login', 'add_to_cart', 'checkout'], within: 300000}
      action,
      state: new Map(),
      sequences: new Map()
    };
    
    const detectTransform = async (data) => {
      const userId = data.userId || data.key;
      const eventType = data.eventType || data.type;
      const timestamp = data.timestamp || Date.now();
      
      // User sequence'ni olish yoki yaratish
      if (!patternDetector.sequences.has(userId)) {
        patternDetector.sequences.set(userId, []);
      }
      
      const sequence = patternDetector.sequences.get(userId);
      sequence.push({ eventType, timestamp, data });
      
      // Eski event'larni tozalash
      const cutoffTime = timestamp - pattern.within;
      const filteredSequence = sequence.filter(event => event.timestamp > cutoffTime);
      patternDetector.sequences.set(userId, filteredSequence);
      
      // Pattern tekshirish
      if (this._matchesPattern(filteredSequence, pattern.sequence)) {
        await action(userId, filteredSequence);
      }
      
      return data;
    };
    
    stream.transformations.push(detectTransform);
    return this;
  }

  /**
   * Stream topology'ni execute qilish
   */
  async execute(streamName) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    console.log(`🔄 Executing stream: ${streamName}`);
    
    // Source'dan o'qish
    const source = await this._createSource(stream.source);
    
    // Sink'ga yozish
    const sink = await this._createSink(stream.sink);
    
    // Pipeline yaratish
    source
      .pipe(stream.processor)
      .pipe(sink)
      .on('finish', () => {
        console.log(`✅ Stream ${streamName} completed`);
        this.emit('stream:completed', streamName);
      })
      .on('error', (error) => {
        console.error(`❌ Stream ${streamName} error:`, error);
        this.emit('stream:error', { streamName, error });
      });
  }

  /**
   * Real-time analytics
   */
  async computeMetrics(streamName, metricsConfig) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    const metricsTransform = async (data) => {
      const metrics = {};
      
      for (const [metricName, calculator] of Object.entries(metricsConfig)) {
        metrics[metricName] = await calculator(data);
      }
      
      // Metrics'ni real-time publish qilish
      await this._publishMetrics(streamName, metrics);
      
      return { ...data, metrics };
    };
    
    stream.transformations.push(metricsTransform);
    return this;
  }

  /**
   * Backpressure management
   */
  applyBackpressure(streamName, options = {}) {
    const stream = this.processors.get(streamName);
    if (!stream) throw new Error(`Stream ${streamName} not found`);
    
    const {
      highWatermark = 1000,
      strategy = 'drop', // drop, buffer, pause
      maxBufferSize = 10000
    } = options;
    
    const backpressureTransform = new Transform({
      objectMode: true,
      highWatermark,
      transform: async function(data, encoding, callback) {
        const bufferSize = this.readableLength;
        
        if (bufferSize > maxBufferSize) {
          switch (strategy) {
            case 'drop':
              // Drop the message
              console.warn(`Dropping message due to backpressure`);
              return callback();
              
            case 'buffer':
              // Buffer in external storage
              await this._bufferToStorage(data);
              return callback();
              
            case 'pause':
              // Pause processing
              this.pause();
              setTimeout(() => {
                this.resume();
                callback(null, data);
              }, 100);
              return;
              
            default:
              callback(null, data);
          }
        } else {
          callback(null, data);
        }
      }
    });
    
    // Backpressure transform'ni stream'ga qo'shish
    const originalProcessor = stream.processor;
    stream.processor = originalProcessor.pipe(backpressureTransform);
    
    return this;
  }

  // Private metodlar
  async _initializeConsumerGroups() {
    // Kafka consumer groups initialization
    console.log('Initializing consumer groups...');
  }

  async _initializeStateStores() {
    // State stores initialization
    console.log('Initializing state stores...');
  }

  async _initializeWindows() {
    // Window stores initialization
    console.log('Initializing window stores...');
  }

  async _applyAggregation(aggregation, data) {
    const key = data.key || 'default';
    
    if (!aggregation.state.has(key)) {
      aggregation.state.set(key, aggregation.initialValue);
    }
    
    const currentValue = aggregation.state.get(key);
    const newValue = await aggregation.aggregator(currentValue, data);
    aggregation.state.set(key, newValue);
    
    return {
      ...data,
      aggregatedValue: newValue
    };
  }

  _cleanJoinBuffers(joinConfig, currentTime) {
    const windowStart = currentTime - joinConfig.joinWindow;
    
    joinConfig.leftBuffer = joinConfig.leftBuffer.filter(
      item => item.timestamp > windowStart
    );
    
    joinConfig.rightBuffer = joinConfig.rightBuffer.filter(
      item => item.timestamp > windowStart
    );
  }

  async _performJoin(joinConfig, key, data) {
    const results = [];
    const isLeftSide = data.stream === joinConfig.leftStream;
    const targetBuffer = isLeftSide ? joinConfig.rightBuffer : joinConfig.leftBuffer;
    
    for (const item of targetBuffer) {
      if (item.key === key) {
        const joined = await joinConfig.joiner(
          isLeftSide ? data : item.data,
          isLeftSide ? item.data : data
        );
        results.push(joined);
      }
    }
    
    return results;
  }

  _matchesPattern(sequence, pattern) {
    if (sequence.length < pattern.length) return false;
    
    let patternIndex = 0;
    for (const event of sequence) {
      if (event.eventType === pattern[patternIndex]) {
        patternIndex++;
        if (patternIndex === pattern.length) {
          return true;
        }
      }
    }
    
    return false;
  }

  async _createSource(sourceConfig) {
    // Create source stream based on config
    if (sourceConfig.type === 'kafka') {
      // Kafka source implementation
      return new Readable({
        objectMode: true,
        async read() {
          // Mock kafka messages
          this.push({ 
            value: { test: 'data' }, 
            timestamp: Date.now() 
          });
        }
      });
    }
    
    throw new Error(`Unknown source type: ${sourceConfig.type}`);
  }

  async _createSink(sinkConfig) {
    // Create sink stream based on config
    if (sinkConfig.type === 'kafka') {
      // Kafka sink implementation
      return new Writable({
        objectMode: true,
        async write(data, encoding, callback) {
          console.log('Sink received:', data);
          callback();
        }
      });
    }
    
    throw new Error(`Unknown sink type: ${sinkConfig.type}`);
  }

  async _publishMetrics(streamName, metrics) {
    // Publish metrics to monitoring system
    console.log(`Publishing metrics for ${streamName}:`, metrics);
  }

  async _bufferToStorage(data) {
    // Buffer overflow data to external storage
    console.log('Buffering data to storage:', data);
  }
}

module.exports = StreamProcessor; 