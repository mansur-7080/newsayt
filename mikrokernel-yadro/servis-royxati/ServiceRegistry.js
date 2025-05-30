/**
 * ServiceRegistry - Mikrokernel Architecture
 * Barcha mikroservislarni ro'yxatga olish va topish
 */

const EventEmitter = require('events');

class ServiceRegistry extends EventEmitter {
  constructor() {
    super();
    this.services = new Map();
    this.healthChecks = new Map();
    this.loadBalancers = new Map();
  }

  /**
   * Servisni ro'yxatdan o'tkazish
   * @param {Object} serviceInfo 
   */
  register(serviceInfo) {
    const {
      name,
      version,
      host,
      port,
      protocol = 'http',
      healthCheck,
      metadata = {},
      tags = []
    } = serviceInfo;

    const serviceId = this._generateServiceId(name, host, port);
    
    const service = {
      id: serviceId,
      name,
      version,
      host,
      port,
      protocol,
      url: `${protocol}://${host}:${port}`,
      metadata,
      tags,
      registeredAt: new Date(),
      lastHeartbeat: new Date(),
      status: 'healthy',
      healthCheckUrl: healthCheck || `${protocol}://${host}:${port}/health`
    };

    // Servisni saqlash
    if (!this.services.has(name)) {
      this.services.set(name, new Map());
    }
    this.services.get(name).set(serviceId, service);

    // Health check boshlash
    this._startHealthCheck(service);

    // Event yuborish
    this.emit('service:registered', service);

    console.log(`✅ Service registered: ${name} at ${service.url}`);
    return serviceId;
  }

  /**
   * Servisni ro'yxatdan chiqarish
   * @param {string} serviceId 
   */
  deregister(serviceId) {
    for (const [serviceName, instances] of this.services) {
      if (instances.has(serviceId)) {
        const service = instances.get(serviceId);
        instances.delete(serviceId);
        
        // Health check to'xtatish
        this._stopHealthCheck(serviceId);
        
        // Event yuborish
        this.emit('service:deregistered', service);
        
        console.log(`❌ Service deregistered: ${serviceName} (${serviceId})`);
        return true;
      }
    }
    return false;
  }

  /**
   * Servisni topish
   * @param {string} serviceName 
   * @param {Object} options 
   */
  discover(serviceName, options = {}) {
    const instances = this.services.get(serviceName);
    if (!instances || instances.size === 0) {
      return null;
    }

    const healthyInstances = Array.from(instances.values())
      .filter(s => s.status === 'healthy');

    if (healthyInstances.length === 0) {
      return null;
    }

    // Load balancing strategiyasi
    const strategy = options.loadBalancing || 'round-robin';
    return this._selectInstance(serviceName, healthyInstances, strategy);
  }

  /**
   * Barcha servislarni olish
   * @param {Object} filters 
   */
  getAllServices(filters = {}) {
    const allServices = [];
    
    for (const [serviceName, instances] of this.services) {
      for (const service of instances.values()) {
        // Filtrlarni qo'llash
        if (filters.status && service.status !== filters.status) continue;
        if (filters.tags && !filters.tags.every(tag => service.tags.includes(tag))) continue;
        if (filters.version && service.version !== filters.version) continue;
        
        allServices.push(service);
      }
    }

    return allServices;
  }

  /**
   * Servis sog'ligini tekshirish
   * @param {string} serviceId 
   */
  async checkHealth(serviceId) {
    for (const instances of this.services.values()) {
      if (instances.has(serviceId)) {
        const service = instances.get(serviceId);
        
        try {
          // Mock health check - real implementatsiyada HTTP so'rov yuboriladi
          const isHealthy = Math.random() > 0.1; // 90% healthy
          
          service.status = isHealthy ? 'healthy' : 'unhealthy';
          service.lastHeartbeat = new Date();
          
          if (!isHealthy) {
            this.emit('service:unhealthy', service);
          }
          
          return service.status;
        } catch (error) {
          service.status = 'unhealthy';
          this.emit('service:unhealthy', service);
          return 'unhealthy';
        }
      }
    }
    return null;
  }

  /**
   * Servis metrikalarini olish
   * @param {string} serviceName 
   */
  getServiceMetrics(serviceName) {
    const instances = this.services.get(serviceName);
    if (!instances) return null;

    const metrics = {
      serviceName,
      totalInstances: instances.size,
      healthyInstances: 0,
      unhealthyInstances: 0,
      instances: []
    };

    for (const service of instances.values()) {
      if (service.status === 'healthy') {
        metrics.healthyInstances++;
      } else {
        metrics.unhealthyInstances++;
      }
      
      metrics.instances.push({
        id: service.id,
        status: service.status,
        uptime: Date.now() - service.registeredAt.getTime(),
        lastHeartbeat: service.lastHeartbeat
      });
    }

    return metrics;
  }

  // Private metodlar
  _generateServiceId(name, host, port) {
    return `${name}_${host}_${port}_${Date.now()}`;
  }

  _startHealthCheck(service) {
    const interval = setInterval(async () => {
      await this.checkHealth(service.id);
    }, 30000); // Har 30 sekundda

    this.healthChecks.set(service.id, interval);
  }

  _stopHealthCheck(serviceId) {
    const interval = this.healthChecks.get(serviceId);
    if (interval) {
      clearInterval(interval);
      this.healthChecks.delete(serviceId);
    }
  }

  _selectInstance(serviceName, instances, strategy) {
    switch (strategy) {
      case 'round-robin':
        return this._roundRobinSelect(serviceName, instances);
      case 'random':
        return instances[Math.floor(Math.random() * instances.length)];
      case 'least-connections':
        // Mock implementation
        return instances[0];
      default:
        return instances[0];
    }
  }

  _roundRobinSelect(serviceName, instances) {
    if (!this.loadBalancers.has(serviceName)) {
      this.loadBalancers.set(serviceName, 0);
    }
    
    const index = this.loadBalancers.get(serviceName);
    const selected = instances[index % instances.length];
    
    this.loadBalancers.set(serviceName, index + 1);
    return selected;
  }
}

// Singleton instance
const serviceRegistry = new ServiceRegistry();

module.exports = serviceRegistry; 