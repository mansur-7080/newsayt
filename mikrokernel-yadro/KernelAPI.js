/**
 * KernelAPI - Mikrokernel Architecture
 * Asosiy yadro API va xizmatlar boshqaruvi
 */

const EventEmitter = require('events');
const ServiceRegistry = require('./servis-royxati/ServiceRegistry');
const PluginLoader = require('./PluginLoader');
const MessageBus = require('../asinxron-xabarlar/MessageBus');

class KernelAPI extends EventEmitter {
  constructor() {
    super();
    this.version = '1.0.0';
    this.startTime = null;
    this.services = new Map();
    this.config = new Map();
    this.middlewares = [];
    
    // Core komponentlar
    this.serviceRegistry = ServiceRegistry;
    this.pluginLoader = new PluginLoader(this);
    this.messageBus = MessageBus;
    
    // Kernel holatini kuzatish
    this.state = {
      status: 'initialized',
      activePlugins: 0,
      registeredServices: 0,
      processedRequests: 0
    };
  }

  /**
   * Kernel'ni ishga tushirish
   */
  async start() {
    try {
      console.log('🚀 Starting Mikrokernel...');
      this.startTime = new Date();
      this.state.status = 'starting';

      // Core xizmatlarni ro'yxatga olish
      this._registerCoreServices();

      // Event bus'ni sozlash
      this._setupEventBus();

      // Health check'ni boshlash
      this._startHealthCheck();

      this.state.status = 'running';
      this.emit('kernel:started', {
        version: this.version,
        startTime: this.startTime
      });

      console.log(`✅ Mikrokernel v${this.version} started successfully`);
      return true;

    } catch (error) {
      this.state.status = 'error';
      this.emit('kernel:error', error);
      throw error;
    }
  }

  /**
   * Kernel'ni to'xtatish
   */
  async stop() {
    console.log('🛑 Stopping Mikrokernel...');
    this.state.status = 'stopping';

    // Barcha pluginlarni to'xtatish
    const plugins = this.pluginLoader.getPlugins({ status: 'started' });
    for (const plugin of plugins) {
      await this.pluginLoader.stopPlugin(plugin.id);
    }

    // Health check'ni to'xtatish
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    this.state.status = 'stopped';
    this.emit('kernel:stopped');
    console.log('✅ Mikrokernel stopped');
  }

  /**
   * Xizmatni ro'yxatga olish
   */
  registerService(name, service) {
    if (this.services.has(name)) {
      throw new Error(`Service ${name} already registered`);
    }

    this.services.set(name, {
      name,
      service,
      registeredAt: new Date(),
      calls: 0
    });

    this.state.registeredServices++;
    this.emit('service:registered', { name, service });
    console.log(`✅ Service registered: ${name}`);
  }

  /**
   * Xizmatni olish
   */
  getService(name) {
    const serviceInfo = this.services.get(name);
    if (!serviceInfo) {
      throw new Error(`Service ${name} not found`);
    }

    serviceInfo.calls++;
    return serviceInfo.service;
  }

  /**
   * Xizmatni o'chirish
   */
  unregisterService(name) {
    if (this.services.delete(name)) {
      this.state.registeredServices--;
      this.emit('service:unregistered', { name });
      console.log(`✅ Service unregistered: ${name}`);
      return true;
    }
    return false;
  }

  /**
   * Plugin yuklash
   */
  async loadPlugin(pluginPath, options = {}) {
    const plugin = await this.pluginLoader.loadPlugin(pluginPath, options);
    this.state.activePlugins++;
    return plugin;
  }

  /**
   * Plugin'ni ishga tushirish
   */
  async startPlugin(pluginId) {
    const plugin = await this.pluginLoader.startPlugin(pluginId);
    return plugin;
  }

  /**
   * Konfiguratsiya o'rnatish
   */
  setConfig(key, value) {
    this.config.set(key, value);
    this.emit('config:changed', { key, value });
  }

  /**
   * Konfiguratsiya olish
   */
  getConfig(key, defaultValue = null) {
    return this.config.get(key) || defaultValue;
  }

  /**
   * Middleware qo'shish
   */
  use(middleware) {
    if (typeof middleware !== 'function') {
      throw new Error('Middleware must be a function');
    }
    this.middlewares.push(middleware);
  }

  /**
   * So'rovni qayta ishlash (middleware chain)
   */
  async processRequest(request) {
    this.state.processedRequests++;
    
    let result = request;
    for (const middleware of this.middlewares) {
      result = await middleware(result, this);
    }
    
    return result;
  }

  /**
   * Hook'ni bajarish
   */
  async executeHook(hookName, data) {
    return this.pluginLoader.executeHook(hookName, data);
  }

  /**
   * Xabar yuborish
   */
  async sendMessage(channel, message, options) {
    return this.messageBus.publish(channel, message, options);
  }

  /**
   * Xabarga obuna bo'lish
   */
  subscribeToMessage(channel, handler, options) {
    return this.messageBus.subscribe(channel, `kernel_${Date.now()}`, handler, options);
  }

  /**
   * Kernel statistikasi
   */
  getStats() {
    const uptime = this.startTime ? Date.now() - this.startTime.getTime() : 0;
    
    return {
      version: this.version,
      status: this.state.status,
      uptime,
      startTime: this.startTime,
      plugins: {
        total: this.pluginLoader.getPlugins().length,
        active: this.state.activePlugins
      },
      services: {
        total: this.state.registeredServices,
        list: Array.from(this.services.keys())
      },
      requests: this.state.processedRequests,
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    };
  }

  /**
   * API endpoint'larni olish
   */
  getAPIEndpoints() {
    const endpoints = [];

    // Core API endpoints
    endpoints.push(
      { method: 'GET', path: '/kernel/status', handler: 'getStatus' },
      { method: 'GET', path: '/kernel/stats', handler: 'getStats' },
      { method: 'GET', path: '/kernel/services', handler: 'listServices' },
      { method: 'POST', path: '/kernel/plugins/load', handler: 'loadPlugin' },
      { method: 'POST', path: '/kernel/plugins/:id/start', handler: 'startPlugin' },
      { method: 'POST', path: '/kernel/plugins/:id/stop', handler: 'stopPlugin' },
      { method: 'GET', path: '/kernel/config/:key', handler: 'getConfig' },
      { method: 'PUT', path: '/kernel/config/:key', handler: 'setConfig' }
    );

    // Plugin endpoints
    const plugins = this.pluginLoader.getPlugins();
    for (const plugin of plugins) {
      if (plugin.instance && plugin.instance.getEndpoints) {
        const pluginEndpoints = plugin.instance.getEndpoints();
        endpoints.push(...pluginEndpoints.map(ep => ({
          ...ep,
          plugin: plugin.id
        })));
      }
    }

    return endpoints;
  }

  // Private metodlar
  _registerCoreServices() {
    // Service Registry
    this.registerService('service.registry', {
      register: this.serviceRegistry.register.bind(this.serviceRegistry),
      discover: this.serviceRegistry.discover.bind(this.serviceRegistry),
      deregister: this.serviceRegistry.deregister.bind(this.serviceRegistry)
    });

    // Plugin Manager
    this.registerService('plugin.manager', {
      load: this.loadPlugin.bind(this),
      start: this.startPlugin.bind(this),
      stop: this.pluginLoader.stopPlugin.bind(this.pluginLoader),
      list: this.pluginLoader.getPlugins.bind(this.pluginLoader)
    });

    // Message Bus
    this.registerService('message.bus', {
      publish: this.messageBus.publish.bind(this.messageBus),
      subscribe: this.messageBus.subscribe.bind(this.messageBus),
      request: this.messageBus.request.bind(this.messageBus)
    });

    // Config Service
    this.registerService('config', {
      get: this.getConfig.bind(this),
      set: this.setConfig.bind(this),
      getAll: () => Object.fromEntries(this.config)
    });
  }

  _setupEventBus() {
    // Kernel eventlarini message bus'ga yo'naltirish
    this.on('kernel:started', (data) => {
      this.messageBus.publish('kernel.events', { type: 'started', data });
    });

    this.on('kernel:stopped', (data) => {
      this.messageBus.publish('kernel.events', { type: 'stopped', data });
    });

    this.on('service:registered', (data) => {
      this.messageBus.publish('kernel.events', { type: 'service.registered', data });
    });

    this.on('plugin:loaded', (data) => {
      this.messageBus.publish('kernel.events', { type: 'plugin.loaded', data });
    });
  }

  _startHealthCheck() {
    this.healthCheckInterval = setInterval(() => {
      const stats = this.getStats();
      this.emit('kernel:health', stats);
      
      // Memory ogohlantirish
      const memoryUsage = stats.memory.heapUsed / stats.memory.heapTotal;
      if (memoryUsage > 0.9) {
        this.emit('kernel:warning', {
          type: 'memory',
          usage: memoryUsage,
          message: 'High memory usage detected'
        });
      }
    }, 30000); // Har 30 sekundda
  }
}

// Singleton instance
const kernel = new KernelAPI();

module.exports = kernel; 