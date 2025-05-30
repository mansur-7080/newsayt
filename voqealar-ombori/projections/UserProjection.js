/**
 * UserProjection - CQRS Pattern
 * Event'lardan Read Model yaratish
 */

class UserProjection {
  constructor(readDatabase, eventStore) {
    this.db = readDatabase;
    this.eventStore = eventStore;
    this.collection = 'user_read_model';
    this.lastProcessedEvent = null;
  }

  /**
   * Projection'ni boshlash
   */
  async start() {
    console.log('🔄 Starting UserProjection...');

    // Event'larga obuna bo'lish
    this.eventStore.subscribe('UserCreated', this.handleUserCreated.bind(this));
    this.eventStore.subscribe('UserEmailChanged', this.handleUserEmailChanged.bind(this));
    this.eventStore.subscribe('UserProfileUpdated', this.handleUserProfileUpdated.bind(this));
    this.eventStore.subscribe('RoleAssignedToUser', this.handleRoleAssigned.bind(this));
    this.eventStore.subscribe('UserDeactivated', this.handleUserDeactivated.bind(this));
    this.eventStore.subscribe('UserDeleted', this.handleUserDeleted.bind(this));

    // Mavjud event'larni qayta ishlash
    await this.rebuildProjection();

    console.log('✅ UserProjection started');
  }

  /**
   * Projection'ni qayta qurish
   */
  async rebuildProjection() {
    console.log('🔄 Rebuilding UserProjection...');

    // Collection'ni tozalash
    await this.db.collection(this.collection).deleteMany({});

    // Barcha user event'larini olish
    const events = await this.eventStore.getEventsByName('UserCreated');

    for (const event of events) {
      await this.handleUserCreated(event);
    }

    // Boshqa event'larni qo'llash
    const allEvents = await this._getAllUserEvents();
    
    for (const event of allEvents) {
      await this._applyEvent(event);
    }

    console.log('✅ UserProjection rebuilt');
  }

  /**
   * UserCreated event handler
   */
  async handleUserCreated(event) {
    try {
      const userData = {
        _id: event.payload.userId,
        email: event.payload.email,
        username: event.payload.username,
        isActive: true,
        roles: [],
        createdAt: event.occurredAt,
        updatedAt: event.occurredAt,
        lastLoginAt: null,
        profile: null,
        statistics: {
          totalOrders: 0,
          totalSpent: 0,
          lastOrderDate: null
        }
      };

      await this.db.collection(this.collection).insertOne(userData);
      
      console.log(`✅ User read model created: ${event.payload.userId}`);

    } catch (error) {
      console.error('❌ Error handling UserCreated:', error);
    }
  }

  /**
   * UserEmailChanged event handler
   */
  async handleUserEmailChanged(event) {
    try {
      await this.db.collection(this.collection).updateOne(
        { _id: event.payload.userId },
        {
          $set: {
            email: event.payload.newEmail,
            updatedAt: event.occurredAt
          },
          $push: {
            emailHistory: {
              oldEmail: event.payload.oldEmail,
              newEmail: event.payload.newEmail,
              changedAt: event.occurredAt
            }
          }
        }
      );

      console.log(`✅ User email updated: ${event.payload.userId}`);

    } catch (error) {
      console.error('❌ Error handling UserEmailChanged:', error);
    }
  }

  /**
   * UserProfileUpdated event handler
   */
  async handleUserProfileUpdated(event) {
    try {
      await this.db.collection(this.collection).updateOne(
        { _id: event.payload.userId },
        {
          $set: {
            profile: event.payload.profileData,
            updatedAt: event.occurredAt
          }
        }
      );

      console.log(`✅ User profile updated: ${event.payload.userId}`);

    } catch (error) {
      console.error('❌ Error handling UserProfileUpdated:', error);
    }
  }

  /**
   * RoleAssignedToUser event handler
   */
  async handleRoleAssigned(event) {
    try {
      await this.db.collection(this.collection).updateOne(
        { _id: event.payload.userId },
        {
          $addToSet: { roles: event.payload.role },
          $set: { updatedAt: event.occurredAt }
        }
      );

      console.log(`✅ Role assigned to user: ${event.payload.userId}`);

    } catch (error) {
      console.error('❌ Error handling RoleAssignedToUser:', error);
    }
  }

  /**
   * UserDeactivated event handler
   */
  async handleUserDeactivated(event) {
    try {
      await this.db.collection(this.collection).updateOne(
        { _id: event.payload.userId },
        {
          $set: {
            isActive: false,
            deactivatedAt: event.occurredAt,
            deactivationReason: event.payload.reason,
            updatedAt: event.occurredAt
          }
        }
      );

      console.log(`✅ User deactivated: ${event.payload.userId}`);

    } catch (error) {
      console.error('❌ Error handling UserDeactivated:', error);
    }
  }

  /**
   * UserDeleted event handler
   */
  async handleUserDeleted(event) {
    try {
      // Soft delete - ma'lumotlarni saqlab qolish
      await this.db.collection(this.collection).updateOne(
        { _id: event.payload.userId },
        {
          $set: {
            isDeleted: true,
            deletedAt: event.occurredAt,
            updatedAt: event.occurredAt
          }
        }
      );

      console.log(`✅ User marked as deleted: ${event.payload.userId}`);

    } catch (error) {
      console.error('❌ Error handling UserDeleted:', error);
    }
  }

  /**
   * Statistika yangilash (boshqa servislardan event'lar)
   */
  async updateUserStatistics(userId, statisticsUpdate) {
    try {
      await this.db.collection(this.collection).updateOne(
        { _id: userId },
        {
          $inc: {
            'statistics.totalOrders': statisticsUpdate.ordersCount || 0,
            'statistics.totalSpent': statisticsUpdate.amountSpent || 0
          },
          $set: {
            'statistics.lastOrderDate': statisticsUpdate.lastOrderDate || null
          }
        }
      );

    } catch (error) {
      console.error('❌ Error updating user statistics:', error);
    }
  }

  /**
   * Complex query uchun index yaratish
   */
  async createIndexes() {
    const collection = this.db.collection(this.collection);

    await collection.createIndex({ email: 1 }, { unique: true });
    await collection.createIndex({ username: 1 }, { unique: true });
    await collection.createIndex({ isActive: 1 });
    await collection.createIndex({ createdAt: -1 });
    await collection.createIndex({ 'statistics.totalSpent': -1 });
    await collection.createIndex({ roles: 1 });
    
    // Text search uchun
    await collection.createIndex({
      email: 'text',
      username: 'text',
      'profile.firstName': 'text',
      'profile.lastName': 'text'
    });

    console.log('✅ Indexes created for UserProjection');
  }

  // Private metodlar
  async _getAllUserEvents() {
    const eventNames = [
      'UserEmailChanged',
      'UserProfileUpdated',
      'RoleAssignedToUser',
      'UserDeactivated',
      'UserDeleted'
    ];

    const allEvents = [];

    for (const eventName of eventNames) {
      const events = await this.eventStore.getEventsByName(eventName);
      allEvents.push(...events);
    }

    // Vaqt bo'yicha saralash
    return allEvents.sort((a, b) => 
      new Date(a.occurredAt) - new Date(b.occurredAt)
    );
  }

  async _applyEvent(event) {
    switch (event.eventName) {
      case 'UserEmailChanged':
        await this.handleUserEmailChanged(event);
        break;
      case 'UserProfileUpdated':
        await this.handleUserProfileUpdated(event);
        break;
      case 'RoleAssignedToUser':
        await this.handleRoleAssigned(event);
        break;
      case 'UserDeactivated':
        await this.handleUserDeactivated(event);
        break;
      case 'UserDeleted':
        await this.handleUserDeleted(event);
        break;
    }
  }
}

module.exports = UserProjection; 