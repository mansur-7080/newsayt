/**
 * DIContainer - Dependency Injection Container
 * Hexagonal Architecture uchun dependency management
 */

class DIContainer {
  constructor() {
    this.services = new Map();
    this.singletons = new Map();
    this.factories = new Map();
    this.aliases = new Map();
    this.resolving = new Set();
  }

  /**
   * Service'ni ro'yxatga olish
   * @param {string} name 
   * @param {Function|Object} definition 
   * @param {Object} options 
   */
  register(name, definition, options = {}) {
    const {
      singleton = false,
      factory = false,
      dependencies = [],
      tags = [],
      alias = null
    } = options;

    const service = {
      name,
      definition,
      singleton,
      factory,
      dependencies,
      tags,
      resolved: false
    };

    this.services.set(name, service);

    // Alias qo'shish
    if (alias) {
      this.aliases.set(alias, name);
    }

    // Tag'lar bo'yicha indekslash
    tags.forEach(tag => {
      if (!this.tags) this.tags = new Map();
      if (!this.tags.has(tag)) {
        this.tags.set(tag, new Set());
      }
      this.tags.get(tag).add(name);
    });

    return this;
  }

  /**
   * Factory registratsiya
   * @param {string} name 
   * @param {Function} factory 
   * @param {Array} dependencies 
   */
  registerFactory(name, factory, dependencies = []) {
    return this.register(name, factory, {
      factory: true,
      dependencies
    });
  }

  /**
   * Singleton registratsiya
   * @param {string} name 
   * @param {Function|Object} definition 
   * @param {Array} dependencies 
   */
  registerSingleton(name, definition, dependencies = []) {
    return this.register(name, definition, {
      singleton: true,
      dependencies
    });
  }

  /**
   * Service'ni olish
   * @param {string} name 
   */
  get(name) {
    // Alias tekshirish
    const actualName = this.aliases.get(name) || name;

    // Singleton cache tekshirish
    if (this.singletons.has(actualName)) {
      return this.singletons.get(actualName);
    }

    // Service mavjudligini tekshirish
    if (!this.services.has(actualName)) {
      throw new Error(`Service "${actualName}" not found in container`);
    }

    // Circular dependency tekshirish
    if (this.resolving.has(actualName)) {
      throw new Error(`Circular dependency detected: ${actualName}`);
    }

    this.resolving.add(actualName);

    try {
      const service = this.services.get(actualName);
      const instance = this._resolve(service);

      // Singleton saqlash
      if (service.singleton) {
        this.singletons.set(actualName, instance);
      }

      service.resolved = true;
      this.resolving.delete(actualName);

      return instance;

    } catch (error) {
      this.resolving.delete(actualName);
      throw error;
    }
  }

  /**
   * Service mavjudligini tekshirish
   * @param {string} name 
   */
  has(name) {
    const actualName = this.aliases.get(name) || name;
    return this.services.has(actualName);
  }

  /**
   * Tag bo'yicha service'larni olish
   * @param {string} tag 
   */
  getByTag(tag) {
    if (!this.tags || !this.tags.has(tag)) {
      return [];
    }

    const serviceNames = Array.from(this.tags.get(tag));
    return serviceNames.map(name => ({
      name,
      instance: this.get(name)
    }));
  }

  /**
   * Barcha service'larni olish
   */
  getAll() {
    const services = {};
    for (const [name, service] of this.services) {
      if (!service.factory) {
        services[name] = this.get(name);
      }
    }
    return services;
  }

  /**
   * Container'ni tozalash
   */
  clear() {
    this.services.clear();
    this.singletons.clear();
    this.factories.clear();
    this.aliases.clear();
    this.resolving.clear();
    if (this.tags) {
      this.tags.clear();
    }
  }

  /**
   * Service'ni o'chirish
   * @param {string} name 
   */
  remove(name) {
    const actualName = this.aliases.get(name) || name;
    
    // Service o'chirish
    this.services.delete(actualName);
    
    // Singleton cache'dan o'chirish
    this.singletons.delete(actualName);
    
    // Alias'larni tozalash
    for (const [alias, serviceName] of this.aliases) {
      if (serviceName === actualName) {
        this.aliases.delete(alias);
      }
    }
    
    // Tag'lardan o'chirish
    if (this.tags) {
      for (const taggedServices of this.tags.values()) {
        taggedServices.delete(actualName);
      }
    }
  }

  /**
   * Auto-wiring qo'llab-quvvatlash
   * @param {Function} ClassConstructor 
   * @param {Array} additionalDependencies 
   */
  autowire(ClassConstructor, additionalDependencies = []) {
    // Constructor parametrlarini tahlil qilish
    const params = this._getParameterNames(ClassConstructor);
    const dependencies = params.length > 0 ? params : additionalDependencies;

    // Dependency'larni resolve qilish
    const resolvedDeps = dependencies.map(dep => {
      if (typeof dep === 'string') {
        return this.get(dep);
      }
      return dep;
    });

    return new ClassConstructor(...resolvedDeps);
  }

  /**
   * Decorator pattern uchun
   */
  decorate(name, decorator) {
    const original = this.get(name);
    const decorated = decorator(original);
    
    // Decorated versiyani singleton sifatida saqlash
    this.singletons.set(name, decorated);
    
    return decorated;
  }

  // Private metodlar
  _resolve(service) {
    const { definition, factory, dependencies } = service;

    // Dependency'larni resolve qilish
    const resolvedDeps = dependencies.map(dep => {
      if (typeof dep === 'string') {
        return this.get(dep);
      }
      return dep;
    });

    // Factory function
    if (factory && typeof definition === 'function') {
      return definition(...resolvedDeps, this);
    }

    // Class constructor
    if (typeof definition === 'function' && definition.prototype) {
      return new definition(...resolvedDeps);
    }

    // Object yoki value
    return definition;
  }

  _getParameterNames(func) {
    // Soddalashtirilgan parameter nomlarini olish
    const funcStr = func.toString();
    const match = funcStr.match(/\(([^)]*)\)/);
    
    if (!match || !match[1]) {
      return [];
    }

    return match[1]
      .split(',')
      .map(param => param.trim())
      .filter(param => param.length > 0);
  }

  /**
   * Container konfiguratsiyasini export qilish
   */
  export() {
    const config = {
      services: [],
      aliases: Object.fromEntries(this.aliases)
    };

    for (const [name, service] of this.services) {
      config.services.push({
        name,
        singleton: service.singleton,
        factory: service.factory,
        dependencies: service.dependencies,
        tags: service.tags
      });
    }

    return config;
  }

  /**
   * Container konfiguratsiyasini import qilish
   */
  import(config, definitions) {
    // Service'larni import qilish
    config.services.forEach(serviceConfig => {
      const definition = definitions[serviceConfig.name];
      if (definition) {
        this.register(serviceConfig.name, definition, {
          singleton: serviceConfig.singleton,
          factory: serviceConfig.factory,
          dependencies: serviceConfig.dependencies,
          tags: serviceConfig.tags
        });
      }
    });

    // Alias'larni import qilish
    Object.entries(config.aliases).forEach(([alias, name]) => {
      this.aliases.set(alias, name);
    });
  }
}

// Singleton instance
const container = new DIContainer();

module.exports = container; 