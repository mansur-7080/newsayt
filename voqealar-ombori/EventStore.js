/**
 * EventStore - Event Sourcing Pattern
 * Barcha domain voqealarini saqlash va boshqarish
 */

const fs = require('fs').promises;
const path = require('path');

class EventStore {
  constructor(storagePath = './voqealar-ombori') {
    this.storagePath = storagePath;
    this.subscribers = new Map(); // Event subscriber'lar
    this.snapshots = new Map(); // Aggregate snapshot'lar
  }

  /**
   * Yangi event qo'shish
   * @param {Object} event 
   * @returns {Promise<void>}
   */
  async append(event) {
    // Event validatsiyasi
    this._validateEvent(event);

    // Event'ga metadata qo'shish
    const enrichedEvent = {
      ...event,
      eventId: this._generateEventId(),
      storedAt: new Date().toISOString(),
      version: await this._getNextVersion(event.aggregateId)
    };

    // Event'ni saqlash
    const filePath = this._getEventFilePath(event.aggregateId);
    const events = await this._loadEvents(filePath);
    events.push(enrichedEvent);
    await fs.writeFile(filePath, JSON.stringify(events, null, 2));

    // Subscriber'larni xabardor qilish
    await this._notifySubscribers(enrichedEvent);

    return enrichedEvent;
  }

  /**
   * Aggregate uchun barcha eventlarni olish
   * @param {string} aggregateId 
   * @param {number} fromVersion 
   * @returns {Promise<Array>}
   */
  async getEvents(aggregateId, fromVersion = 0) {
    const filePath = this._getEventFilePath(aggregateId);
    const events = await this._loadEvents(filePath);
    
    return events.filter(e => e.version > fromVersion);
  }

  /**
   * Ma'lum vaqt oralig'idagi eventlar
   * @param {Date} startDate 
   * @param {Date} endDate 
   * @returns {Promise<Array>}
   */
  async getEventsByDateRange(startDate, endDate) {
    const allEvents = [];
    const files = await fs.readdir(this.storagePath);

    for (const file of files) {
      if (file.endsWith('-events.json')) {
        const events = await this._loadEvents(path.join(this.storagePath, file));
        const filtered = events.filter(e => {
          const eventDate = new Date(e.occurredAt);
          return eventDate >= startDate && eventDate <= endDate;
        });
        allEvents.push(...filtered);
      }
    }

    return allEvents.sort((a, b) => new Date(a.occurredAt) - new Date(b.occurredAt));
  }

  /**
   * Event nomiga ko'ra qidirish
   * @param {string} eventName 
   * @returns {Promise<Array>}
   */
  async getEventsByName(eventName) {
    const allEvents = [];
    const files = await fs.readdir(this.storagePath);

    for (const file of files) {
      if (file.endsWith('-events.json')) {
        const events = await this._loadEvents(path.join(this.storagePath, file));
        const filtered = events.filter(e => e.eventName === eventName);
        allEvents.push(...filtered);
      }
    }

    return allEvents;
  }

  /**
   * Snapshot saqlash
   * @param {string} aggregateId 
   * @param {Object} snapshot 
   * @param {number} version 
   */
  async saveSnapshot(aggregateId, snapshot, version) {
    const snapshotData = {
      aggregateId,
      snapshot,
      version,
      createdAt: new Date().toISOString()
    };

    this.snapshots.set(aggregateId, snapshotData);

    // Snapshot'ni faylga saqlash
    const snapshotPath = path.join(this.storagePath, `${aggregateId}-snapshot.json`);
    await fs.writeFile(snapshotPath, JSON.stringify(snapshotData, null, 2));
  }

  /**
   * Snapshot olish
   * @param {string} aggregateId 
   * @returns {Promise<Object|null>}
   */
  async getSnapshot(aggregateId) {
    // Cache'dan tekshirish
    if (this.snapshots.has(aggregateId)) {
      return this.snapshots.get(aggregateId);
    }

    // Fayldan o'qish
    const snapshotPath = path.join(this.storagePath, `${aggregateId}-snapshot.json`);
    try {
      const data = await fs.readFile(snapshotPath, 'utf8');
      const snapshot = JSON.parse(data);
      this.snapshots.set(aggregateId, snapshot);
      return snapshot;
    } catch (error) {
      return null;
    }
  }

  /**
   * Event subscriber qo'shish
   * @param {string} eventName 
   * @param {Function} handler 
   */
  subscribe(eventName, handler) {
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }
    this.subscribers.get(eventName).push(handler);
  }

  /**
   * Aggregate'ni replay qilish
   * @param {string} aggregateId 
   * @param {Object} initialState 
   * @param {Function} reducer 
   * @returns {Promise<Object>}
   */
  async replay(aggregateId, initialState, reducer) {
    // Snapshot tekshirish
    const snapshot = await this.getSnapshot(aggregateId);
    let state = snapshot ? snapshot.snapshot : initialState;
    let fromVersion = snapshot ? snapshot.version : 0;

    // Event'larni qo'llash
    const events = await this.getEvents(aggregateId, fromVersion);
    for (const event of events) {
      state = reducer(state, event);
    }

    return state;
  }

  // Yordamchi metodlar
  _validateEvent(event) {
    if (!event.eventName) throw new Error('Event nomi majburiy');
    if (!event.aggregateId) throw new Error('Aggregate ID majburiy');
    if (!event.occurredAt) throw new Error('Event vaqti majburiy');
    if (!event.payload) throw new Error('Event payload majburiy');
  }

  _generateEventId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  _getEventFilePath(aggregateId) {
    return path.join(this.storagePath, `${aggregateId}-events.json`);
  }

  async _loadEvents(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async _getNextVersion(aggregateId) {
    const events = await this.getEvents(aggregateId);
    return events.length + 1;
  }

  async _notifySubscribers(event) {
    const handlers = this.subscribers.get(event.eventName) || [];
    const allHandlers = this.subscribers.get('*') || []; // Wildcard subscribers

    const promises = [
      ...handlers.map(handler => handler(event)),
      ...allHandlers.map(handler => handler(event))
    ];

    await Promise.all(promises);
  }
}

module.exports = EventStore; 