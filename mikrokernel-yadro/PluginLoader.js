/**
 * PluginLoader - Mikrokernel Architecture
 * Pluginlarni dinamik yuklash va boshqarish
 */

const path = require('path');
const fs = require('fs').promises;
const EventEmitter = require('events');

class PluginLoader extends EventEmitter {
  constructor(kernel) {
    super();
    this.kernel = kernel;
    this.plugins = new Map();
    this.hooks = new Map();
    this.dependencies = new Map();
  }

  /**
   * Pluginni yuklash
   * @param {string} pluginPath 
   * @param {Object} options 
   */
  async loadPlugin(pluginPath, options = {}) {
    try {
      // Plugin ma'lumotlarini o'qish
      const manifestPath = path.join(pluginPath, 'plugin.json');
      const manifestData = await fs.readFile(manifestPath, 'utf8');
      const manifest = JSON.parse(manifestData);

      // Plugin validatsiyasi
      this._validateManifest(manifest);

      // Dependency'larni tekshirish
      if (manifest.dependencies) {
        await this._checkDependencies(manifest.dependencies);
      }

      // Plugin kodini yuklash
      const pluginModule = require(path.join(pluginPath, manifest.main || 'index.js'));

      // Plugin instance yaratish
      const plugin = {
        id: manifest.id,
        name: manifest.name,
        version: manifest.version,
        description: manifest.description,
        author: manifest.author,
        path: pluginPath,
        instance: null,
        status: 'loaded',
        manifest,
        hooks: [],
        startTime: null
      };

      // Plugin'ni initialize qilish
      if (typeof pluginModule === 'function') {
        plugin.instance = new pluginModule(this.kernel, options);
      } else if (typeof pluginModule.default === 'function') {
        plugin.instance = new pluginModule.default(this.kernel, options);
      } else {
        plugin.instance = pluginModule;
      }

      // Plugin metodlarini tekshirish
      if (plugin.instance.init && typeof plugin.instance.init === 'function') {
        await plugin.instance.init();
      }

      // Hook'larni ro'yxatga olish
      if (manifest.hooks) {
        this._registerHooks(plugin, manifest.hooks);
      }

      // Plugin'ni saqlash
      this.plugins.set(manifest.id, plugin);

      // Event yuborish
      this.emit('plugin:loaded', plugin);

      console.log(`✅ Plugin loaded: ${manifest.name} v${manifest.version}`);
      return plugin;

    } catch (error) {
      console.error(`❌ Failed to load plugin from ${pluginPath}:`, error);
      throw error;
    }
  }

  /**
   * Plugin'ni ishga tushirish
   * @param {string} pluginId 
   */
  async startPlugin(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    if (plugin.status === 'started') {
      return plugin;
    }

    try {
      // Start metodini chaqirish
      if (plugin.instance.start && typeof plugin.instance.start === 'function') {
        await plugin.instance.start();
      }

      plugin.status = 'started';
      plugin.startTime = new Date();

      // Kernel'ga plugin xizmatlarini qo'shish
      if (plugin.instance.services) {
        for (const [serviceName, service] of Object.entries(plugin.instance.services)) {
          this.kernel.registerService(`${pluginId}.${serviceName}`, service);
        }
      }

      this.emit('plugin:started', plugin);
      console.log(`✅ Plugin started: ${plugin.name}`);

      return plugin;

    } catch (error) {
      plugin.status = 'error';
      this.emit('plugin:error', { plugin, error });
      throw error;
    }
  }

  /**
   * Plugin'ni to'xtatish
   * @param {string} pluginId 
   */
  async stopPlugin(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    if (plugin.status !== 'started') {
      return plugin;
    }

    try {
      // Stop metodini chaqirish
      if (plugin.instance.stop && typeof plugin.instance.stop === 'function') {
        await plugin.instance.stop();
      }

      // Hook'larni o'chirish
      this._unregisterHooks(plugin);

      // Kernel'dan xizmatlarni o'chirish
      if (plugin.instance.services) {
        for (const serviceName of Object.keys(plugin.instance.services)) {
          this.kernel.unregisterService(`${pluginId}.${serviceName}`);
        }
      }

      plugin.status = 'stopped';
      plugin.startTime = null;

      this.emit('plugin:stopped', plugin);
      console.log(`⏹️ Plugin stopped: ${plugin.name}`);

      return plugin;

    } catch (error) {
      plugin.status = 'error';
      this.emit('plugin:error', { plugin, error });
      throw error;
    }
  }

  /**
   * Plugin'ni o'chirish
   * @param {string} pluginId 
   */
  async unloadPlugin(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    // Agar ishlab turgan bo'lsa, avval to'xtatish
    if (plugin.status === 'started') {
      await this.stopPlugin(pluginId);
    }

    // Destroy metodini chaqirish
    if (plugin.instance.destroy && typeof plugin.instance.destroy === 'function') {
      await plugin.instance.destroy();
    }

    // Plugin'ni ro'yxatdan o'chirish
    this.plugins.delete(pluginId);

    // Dependency'larni tozalash
    this.dependencies.delete(pluginId);

    this.emit('plugin:unloaded', plugin);
    console.log(`🗑️ Plugin unloaded: ${plugin.name}`);
  }

  /**
   * Hook'ni execute qilish
   * @param {string} hookName 
   * @param {*} data 
   */
  async executeHook(hookName, data) {
    const hooks = this.hooks.get(hookName) || [];
    let result = data;

    for (const hook of hooks) {
      try {
        if (hook.type === 'filter') {
          result = await hook.handler(result);
        } else {
          await hook.handler(result);
        }
      } catch (error) {
        console.error(`Error in hook ${hookName} from plugin ${hook.pluginId}:`, error);
        this.emit('hook:error', { hookName, hook, error });
      }
    }

    return result;
  }

  /**
   * Barcha plugin'larni olish
   * @param {Object} filter 
   */
  getPlugins(filter = {}) {
    const plugins = Array.from(this.plugins.values());

    if (filter.status) {
      return plugins.filter(p => p.status === filter.status);
    }

    return plugins;
  }

  /**
   * Plugin ma'lumotlarini olish
   * @param {string} pluginId 
   */
  getPlugin(pluginId) {
    return this.plugins.get(pluginId);
  }

  // Private metodlar
  _validateManifest(manifest) {
    const required = ['id', 'name', 'version'];
    for (const field of required) {
      if (!manifest[field]) {
        throw new Error(`Plugin manifest must have ${field} field`);
      }
    }

    // Version formatini tekshirish
    if (!/^\d+\.\d+\.\d+/.test(manifest.version)) {
      throw new Error('Invalid version format. Use semver (e.g., 1.0.0)');
    }
  }

  async _checkDependencies(dependencies) {
    for (const [depId, depVersion] of Object.entries(dependencies)) {
      const plugin = this.plugins.get(depId);
      
      if (!plugin) {
        throw new Error(`Dependency ${depId} not found`);
      }

      // Version tekshirish (soddalashtirilgan)
      if (depVersion !== '*' && plugin.version !== depVersion) {
        throw new Error(`Dependency ${depId} version mismatch. Required: ${depVersion}, Found: ${plugin.version}`);
      }
    }
  }

  _registerHooks(plugin, hooks) {
    for (const hookConfig of hooks) {
      const { name, type = 'action', priority = 10, handler } = hookConfig;

      if (!this.hooks.has(name)) {
        this.hooks.set(name, []);
      }

      const hook = {
        pluginId: plugin.id,
        type,
        priority,
        handler: plugin.instance[handler].bind(plugin.instance)
      };

      // Priority bo'yicha saralash
      const hookList = this.hooks.get(name);
      hookList.push(hook);
      hookList.sort((a, b) => a.priority - b.priority);

      plugin.hooks.push(name);
    }
  }

  _unregisterHooks(plugin) {
    for (const hookName of plugin.hooks) {
      const hooks = this.hooks.get(hookName);
      if (hooks) {
        this.hooks.set(
          hookName,
          hooks.filter(h => h.pluginId !== plugin.id)
        );
      }
    }
    plugin.hooks = [];
  }
}

module.exports = PluginLoader; 