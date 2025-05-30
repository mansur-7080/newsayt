/**
 * UserRepositoryAdapter - Hexagonal Architecture Adapter
 * UserRepositoryPort implementatsiyasi
 */

const UserRepositoryPort = require('../ports/UserRepositoryPort');
const UserAggregate = require('../../biznes-logika/aggregates/UserAggregate');
const User = require('../../biznes-logika/entities/User');

class UserRepositoryAdapter extends UserRepositoryPort {
  constructor(database, eventStore) {
    super();
    this.db = database;
    this.eventStore = eventStore;
    this.collection = 'users';
  }

  /**
   * User aggregate'ni saqlash
   * @param {UserAggregate} userAggregate 
   */
  async save(userAggregate) {
    try {
      // Transaction boshlash
      const session = await this.db.startSession();
      
      await session.withTransaction(async () => {
        // User ma'lumotlarini saqlash
        const userData = userAggregate.toJSON();
        
        // Database'ga yozish
        await this.db.collection(this.collection).replaceOne(
          { _id: userData.user.id },
          {
            _id: userData.user.id,
            ...userData.user,
            profile: userData.profile,
            preferences: userData.preferences,
            updatedAt: new Date()
          },
          { upsert: true, session }
        );

        // Domain eventlarni event store'ga yozish
        const events = userAggregate.getDomainEvents();
        for (const event of events) {
          await this.eventStore.append(event);
        }

        // Eventlarni tozalash
        userAggregate.clearDomainEvents();
      });

      console.log(`✅ User saved: ${userAggregate.user.id}`);
      return true;

    } catch (error) {
      console.error('❌ Error saving user:', error);
      throw error;
    }
  }

  /**
   * ID bo'yicha foydalanuvchini topish
   * @param {string} id 
   */
  async findById(id) {
    try {
      const userData = await this.db.collection(this.collection).findOne({ _id: id });
      
      if (!userData) {
        return null;
      }

      return this._reconstructAggregate(userData);

    } catch (error) {
      console.error('❌ Error finding user by ID:', error);
      throw error;
    }
  }

  /**
   * Email bo'yicha foydalanuvchini topish
   * @param {string} email 
   */
  async findByEmail(email) {
    try {
      const userData = await this.db.collection(this.collection).findOne({ 
        email: email.toLowerCase() 
      });
      
      if (!userData) {
        return null;
      }

      return this._reconstructAggregate(userData);

    } catch (error) {
      console.error('❌ Error finding user by email:', error);
      throw error;
    }
  }

  /**
   * Username bo'yicha foydalanuvchini topish
   * @param {string} username 
   */
  async findByUsername(username) {
    try {
      const userData = await this.db.collection(this.collection).findOne({ 
        username: username.toLowerCase() 
      });
      
      if (!userData) {
        return null;
      }

      return this._reconstructAggregate(userData);

    } catch (error) {
      console.error('❌ Error finding user by username:', error);
      throw error;
    }
  }

  /**
   * Foydalanuvchini o'chirish
   * @param {string} id 
   */
  async delete(id) {
    try {
      const result = await this.db.collection(this.collection).deleteOne({ _id: id });
      
      if (result.deletedCount === 0) {
        return false;
      }

      // Soft delete uchun event yaratish
      await this.eventStore.append({
        eventName: 'UserDeleted',
        aggregateId: id,
        occurredAt: new Date(),
        payload: { userId: id }
      });

      console.log(`✅ User deleted: ${id}`);
      return true;

    } catch (error) {
      console.error('❌ Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Barcha foydalanuvchilarni olish (pagination bilan)
   * @param {number} page 
   * @param {number} limit 
   */
  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const [users, total] = await Promise.all([
        this.db.collection(this.collection)
          .find({})
          .skip(skip)
          .limit(limit)
          .toArray(),
        this.db.collection(this.collection).countDocuments({})
      ]);

      const aggregates = users.map(userData => this._reconstructAggregate(userData));

      return {
        users: aggregates,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };

    } catch (error) {
      console.error('❌ Error finding all users:', error);
      throw error;
    }
  }

  /**
   * Foydalanuvchi mavjudligini tekshirish
   * @param {string} id 
   */
  async exists(id) {
    try {
      const count = await this.db.collection(this.collection).countDocuments({ _id: id });
      return count > 0;

    } catch (error) {
      console.error('❌ Error checking user existence:', error);
      throw error;
    }
  }

  /**
   * Event Sourcing orqali aggregate'ni qayta tiklash
   * @param {string} aggregateId 
   */
  async reconstructFromEvents(aggregateId) {
    try {
      // Event store'dan barcha eventlarni olish
      const events = await this.eventStore.getEvents(aggregateId);
      
      if (events.length === 0) {
        return null;
      }

      // Initial state
      let aggregate = null;

      // Eventlarni qo'llash
      for (const event of events) {
        aggregate = await this._applyEvent(aggregate, event);
      }

      return aggregate;

    } catch (error) {
      console.error('❌ Error reconstructing from events:', error);
      throw error;
    }
  }

  // Private metodlar
  _reconstructAggregate(userData) {
    // User entity yaratish
    const user = new User(
      userData._id,
      userData.email,
      userData.username,
      userData.passwordHash,
      userData.createdAt
    );

    // User xususiyatlarini tiklash
    if (userData.isActive !== undefined) {
      userData.isActive ? user.activate() : user.deactivate();
    }
    
    if (userData.roles) {
      userData.roles.forEach(role => user.addRole(role));
    }

    if (userData.lastLoginAt) {
      user._lastLoginAt = new Date(userData.lastLoginAt);
    }

    // Aggregate yaratish
    const aggregate = new UserAggregate(
      user,
      userData.profile,
      userData.preferences
    );

    return aggregate;
  }

  async _applyEvent(aggregate, event) {
    switch (event.eventName) {
      case 'UserCreated':
        return UserAggregate.create(event.payload);
      
      case 'UserEmailChanged':
        if (aggregate) {
          aggregate.changeEmail(event.payload.newEmail);
        }
        return aggregate;
      
      case 'UserProfileUpdated':
        if (aggregate) {
          aggregate.updateProfile(event.payload.profileData);
        }
        return aggregate;
      
      case 'RoleAssignedToUser':
        if (aggregate) {
          aggregate.assignRole(event.payload.role);
        }
        return aggregate;
      
      case 'UserDeactivated':
        if (aggregate) {
          aggregate.deactivateUser(event.payload.reason);
        }
        return aggregate;
      
      default:
        return aggregate;
    }
  }
}

module.exports = UserRepositoryAdapter; 