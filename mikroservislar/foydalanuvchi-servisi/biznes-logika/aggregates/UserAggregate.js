/**
 * User Aggregate - Domain-Driven Design
 * User domenidagi barcha bog'liq entity'larni boshqaruvchi agregat
 */

const User = require('../entities/User');
const Email = require('../value-objects/Email');

class UserAggregate {
  constructor(user, profile = null, preferences = null) {
    this._user = user;
    this._profile = profile;
    this._preferences = preferences;
    this._domainEvents = [];
  }

  // Static factory method - yangi foydalanuvchi yaratish
  static create(userData) {
    // Email value object yaratish
    const email = new Email(userData.email);
    
    // User entity yaratish
    const user = new User(
      userData.id,
      email.value,
      userData.username,
      userData.passwordHash
    );

    const aggregate = new UserAggregate(user);
    
    // Domain event qo'shish
    aggregate._addDomainEvent({
      eventName: 'UserCreated',
      aggregateId: user.id,
      occurredAt: new Date(),
      payload: {
        userId: user.id,
        email: user.email,
        username: user.username
      }
    });

    return aggregate;
  }

  // Aggregate root (User) ga kirish
  get user() {
    return this._user;
  }

  get profile() {
    return this._profile;
  }

  get preferences() {
    return this._preferences;
  }

  // Biznes operatsiyalari
  changeEmail(newEmailValue) {
    const newEmail = new Email(newEmailValue);
    const oldEmail = this._user.email;
    
    this._user.changeEmail(newEmail.value);
    
    this._addDomainEvent({
      eventName: 'UserEmailChanged',
      aggregateId: this._user.id,
      occurredAt: new Date(),
      payload: {
        userId: this._user.id,
        oldEmail: oldEmail,
        newEmail: newEmail.value
      }
    });
  }

  updateProfile(profileData) {
    this._profile = {
      ...this._profile,
      ...profileData,
      updatedAt: new Date()
    };

    this._addDomainEvent({
      eventName: 'UserProfileUpdated',
      aggregateId: this._user.id,
      occurredAt: new Date(),
      payload: {
        userId: this._user.id,
        profileData: profileData
      }
    });
  }

  assignRole(role) {
    this._user.addRole(role);
    
    this._addDomainEvent({
      eventName: 'RoleAssignedToUser',
      aggregateId: this._user.id,
      occurredAt: new Date(),
      payload: {
        userId: this._user.id,
        role: role
      }
    });
  }

  deactivateUser(reason) {
    this._user.deactivate();
    
    this._addDomainEvent({
      eventName: 'UserDeactivated',
      aggregateId: this._user.id,
      occurredAt: new Date(),
      payload: {
        userId: this._user.id,
        reason: reason
      }
    });
  }

  // Domain eventlarni boshqarish
  _addDomainEvent(event) {
    this._domainEvents.push(event);
  }

  getDomainEvents() {
    return [...this._domainEvents];
  }

  clearDomainEvents() {
    this._domainEvents = [];
  }

  // Validatsiya
  isValid() {
    return this._user && 
           this._user.id && 
           this._user.email && 
           this._user.username;
  }

  // Serializatsiya
  toJSON() {
    return {
      user: this._user.toJSON(),
      profile: this._profile,
      preferences: this._preferences
    };
  }
}

module.exports = UserAggregate; 