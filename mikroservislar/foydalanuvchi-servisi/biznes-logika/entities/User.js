/**
 * User Entity - Domain-Driven Design
 * Foydalanuvchi domenining asosiy entity'si
 */

class User {
  constructor(id, email, username, passwordHash, createdAt) {
    this._id = id;
    this._email = email;
    this._username = username;
    this._passwordHash = passwordHash;
    this._createdAt = createdAt || new Date();
    this._updatedAt = new Date();
    this._isActive = true;
    this._roles = [];
    this._lastLoginAt = null;
  }

  // Getters
  get id() { return this._id; }
  get email() { return this._email; }
  get username() { return this._username; }
  get isActive() { return this._isActive; }
  get roles() { return [...this._roles]; }
  get createdAt() { return this._createdAt; }
  get updatedAt() { return this._updatedAt; }
  get lastLoginAt() { return this._lastLoginAt; }

  // Biznes metodlari
  changeEmail(newEmail) {
    if (!this._isValidEmail(newEmail)) {
      throw new Error('Email formati noto\'g\'ri');
    }
    this._email = newEmail;
    this._updatedAt = new Date();
  }

  changeUsername(newUsername) {
    if (!newUsername || newUsername.length < 3) {
      throw new Error('Username kamida 3 ta belgidan iborat bo\'lishi kerak');
    }
    this._username = newUsername;
    this._updatedAt = new Date();
  }

  addRole(role) {
    if (!this._roles.includes(role)) {
      this._roles.push(role);
      this._updatedAt = new Date();
    }
  }

  removeRole(role) {
    this._roles = this._roles.filter(r => r !== role);
    this._updatedAt = new Date();
  }

  activate() {
    this._isActive = true;
    this._updatedAt = new Date();
  }

  deactivate() {
    this._isActive = false;
    this._updatedAt = new Date();
  }

  recordLogin() {
    this._lastLoginAt = new Date();
  }

  // Validatsiya
  _isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Domain Events uchun
  getEvents() {
    return this._domainEvents || [];
  }

  // Serializatsiya
  toJSON() {
    return {
      id: this._id,
      email: this._email,
      username: this._username,
      isActive: this._isActive,
      roles: this._roles,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      lastLoginAt: this._lastLoginAt
    };
  }
}

module.exports = User; 