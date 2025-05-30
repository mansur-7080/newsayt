/**
 * UserEventHandlers - Event Sourcing & CQRS
 * User eventlarini handle qilish
 */

const EventEmitter = require('events');

class UserEventHandlers extends EventEmitter {
  constructor(eventStore, userProjection, notificationService, analyticsService) {
    super();
    this.eventStore = eventStore;
    this.userProjection = userProjection;
    this.notificationService = notificationService;
    this.analyticsService = analyticsService;
    
    // Handler'larni ro'yxatga olish
    this._registerHandlers();
  }

  /**
   * Handler'larni ro'yxatga olish
   */
  _registerHandlers() {
    // User events
    this.on('UserCreated', this.handleUserCreated.bind(this));
    this.on('UserEmailChanged', this.handleUserEmailChanged.bind(this));
    this.on('UserProfileUpdated', this.handleUserProfileUpdated.bind(this));
    this.on('RoleAssignedToUser', this.handleRoleAssigned.bind(this));
    this.on('UserDeactivated', this.handleUserDeactivated.bind(this));
    this.on('UserActivated', this.handleUserActivated.bind(this));
    this.on('UserPasswordChanged', this.handleUserPasswordChanged.bind(this));
    this.on('PasswordResetRequested', this.handlePasswordResetRequested.bind(this));
    this.on('UserDeleted', this.handleUserDeleted.bind(this));
    this.on('UserLoggedIn', this.handleUserLoggedIn.bind(this));
    this.on('UserLoggedOut', this.handleUserLoggedOut.bind(this));
    
    // Transaction events
    this.on('BalanceTransferred', this.handleBalanceTransferred.bind(this));
    
    // Batch events
    this.on('BulkUsersImported', this.handleBulkUsersImported.bind(this));
  }

  /**
   * UserCreated event handler
   */
  async handleUserCreated(event) {
    try {
      console.log(`📥 Handling UserCreated event: ${event.payload.userId}`);

      // 1. Projection'ni yangilash
      await this.userProjection.handleUserCreated(event);

      // 2. Welcome notification yuborish
      await this.notificationService.sendNotification({
        type: 'welcome',
        userId: event.payload.userId,
        channels: ['email', 'in-app'],
        data: {
          username: event.payload.username,
          email: event.payload.email
        }
      });

      // 3. Analytics'ga yozish
      await this.analyticsService.track({
        event: 'user_registered',
        userId: event.payload.userId,
        properties: {
          registrationMethod: 'standard',
          timestamp: event.occurredAt
        }
      });

      // 4. Referral program tekshirish
      if (event.payload.referralCode) {
        await this._processReferral(event.payload.userId, event.payload.referralCode);
      }

      // 5. Default settings yaratish
      await this._createDefaultUserSettings(event.payload.userId);

      this.emit('event:processed', { eventName: 'UserCreated', aggregateId: event.aggregateId });

    } catch (error) {
      console.error('❌ Error handling UserCreated:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * UserEmailChanged event handler
   */
  async handleUserEmailChanged(event) {
    try {
      console.log(`📥 Handling UserEmailChanged event: ${event.payload.userId}`);

      // 1. Projection yangilash
      await this.userProjection.handleUserEmailChanged(event);

      // 2. Email verification yuborish
      await this.notificationService.sendNotification({
        type: 'email_verification',
        userId: event.payload.userId,
        channels: ['email'],
        data: {
          newEmail: event.payload.newEmail,
          verificationLink: await this._generateVerificationLink(event.payload.userId)
        }
      });

      // 3. Security alert yuborish
      await this.notificationService.sendNotification({
        type: 'security_alert',
        userId: event.payload.userId,
        channels: ['email', 'sms'],
        data: {
          action: 'email_changed',
          oldEmail: event.payload.oldEmail,
          newEmail: event.payload.newEmail,
          timestamp: event.occurredAt
        }
      });

      // 4. Audit log
      await this._createAuditLog('email_changed', event);

    } catch (error) {
      console.error('❌ Error handling UserEmailChanged:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * UserProfileUpdated event handler
   */
  async handleUserProfileUpdated(event) {
    try {
      console.log(`📥 Handling UserProfileUpdated event: ${event.payload.userId}`);

      // 1. Projection yangilash
      await this.userProjection.handleUserProfileUpdated(event);

      // 2. Profile completeness check
      const completeness = await this._calculateProfileCompleteness(event.payload.profileData);
      
      if (completeness === 100 && !event.payload.wasComplete) {
        // Profile to'liq to'ldirilganda bonus berish
        await this._grantProfileCompletionBonus(event.payload.userId);
      }

      // 3. Search index yangilash
      await this._updateSearchIndex(event.payload.userId, event.payload.profileData);

    } catch (error) {
      console.error('❌ Error handling UserProfileUpdated:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * RoleAssignedToUser event handler
   */
  async handleRoleAssigned(event) {
    try {
      console.log(`📥 Handling RoleAssignedToUser event: ${event.payload.userId}`);

      // 1. Projection yangilash
      await this.userProjection.handleRoleAssigned(event);

      // 2. Permission cache'ni yangilash
      await this._updatePermissionCache(event.payload.userId, event.payload.role);

      // 3. Role-specific onboarding
      if (event.payload.role === 'seller') {
        await this._initializeSellerAccount(event.payload.userId);
      } else if (event.payload.role === 'admin') {
        await this._sendAdminWelcomeKit(event.payload.userId);
      }

      // 4. Notification
      await this.notificationService.sendNotification({
        type: 'role_assigned',
        userId: event.payload.userId,
        channels: ['in-app', 'email'],
        data: {
          role: event.payload.role,
          permissions: await this._getRolePermissions(event.payload.role)
        }
      });

    } catch (error) {
      console.error('❌ Error handling RoleAssignedToUser:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * UserDeactivated event handler
   */
  async handleUserDeactivated(event) {
    try {
      console.log(`📥 Handling UserDeactivated event: ${event.payload.userId}`);

      // 1. Projection yangilash
      await this.userProjection.handleUserDeactivated(event);

      // 2. Active session'larni tugatish
      await this._terminateUserSessions(event.payload.userId);

      // 3. Scheduled job'larni bekor qilish
      await this._cancelUserScheduledJobs(event.payload.userId);

      // 4. Admin notification
      if (event.payload.reason === 'security_breach') {
        await this._notifySecurityTeam(event);
      }

      // 5. Data retention policy qo'llash
      await this._scheduleDataRetention(event.payload.userId);

    } catch (error) {
      console.error('❌ Error handling UserDeactivated:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * UserActivated event handler
   */
  async handleUserActivated(event) {
    try {
      console.log(`📥 Handling UserActivated event: ${event.payload.userId}`);

      // 1. Projection yangilash
      await this.userProjection.handleUserActivated(event);

      // 2. Welcome back campaign
      await this._startWelcomeBackCampaign(event.payload.userId);

      // 3. Restore scheduled jobs
      await this._restoreUserScheduledJobs(event.payload.userId);

      // 4. Analytics
      await this.analyticsService.track({
        event: 'user_reactivated',
        userId: event.payload.userId,
        properties: {
          activatedAt: event.occurredAt
        }
      });

    } catch (error) {
      console.error('❌ Error handling UserActivated:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * UserPasswordChanged event handler
   */
  async handleUserPasswordChanged(event) {
    try {
      console.log(`📥 Handling UserPasswordChanged event: ${event.payload.userId}`);

      // 1. Security notification
      await this.notificationService.sendNotification({
        type: 'password_changed',
        userId: event.payload.userId,
        channels: ['email', 'sms'],
        priority: 'high',
        data: {
          changedAt: event.occurredAt,
          ipAddress: event.metadata?.ipAddress,
          device: event.metadata?.device
        }
      });

      // 2. Revoke existing tokens
      await this._revokeUserTokens(event.payload.userId);

      // 3. Security audit
      await this._createSecurityAuditLog('password_changed', event);

    } catch (error) {
      console.error('❌ Error handling UserPasswordChanged:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * PasswordResetRequested event handler
   */
  async handlePasswordResetRequested(event) {
    try {
      console.log(`📥 Handling PasswordResetRequested event: ${event.payload.userId}`);

      // 1. Rate limiting check
      const canReset = await this._checkPasswordResetRateLimit(event.payload.userId);
      if (!canReset) {
        console.warn('Password reset rate limit exceeded');
        return;
      }

      // 2. Send reset email
      await this.notificationService.sendNotification({
        type: 'password_reset',
        userId: event.payload.userId,
        channels: ['email'],
        data: {
          resetToken: event.payload.resetToken,
          expiresAt: event.payload.expiresAt,
          resetLink: `https://example.com/reset-password?token=${event.payload.resetToken}`
        }
      });

      // 3. Track attempt
      await this._trackPasswordResetAttempt(event.payload.userId);

    } catch (error) {
      console.error('❌ Error handling PasswordResetRequested:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * UserDeleted event handler
   */
  async handleUserDeleted(event) {
    try {
      console.log(`📥 Handling UserDeleted event: ${event.payload.userId}`);

      // 1. Projection yangilash (soft delete)
      await this.userProjection.handleUserDeleted(event);

      // 2. Data anonymization
      await this._anonymizeUserData(event.payload.userId);

      // 3. Cancel subscriptions
      await this._cancelUserSubscriptions(event.payload.userId);

      // 4. GDPR compliance
      await this._generateDataDeletionReport(event.payload.userId);

      // 5. Final notification
      await this.notificationService.sendNotification({
        type: 'account_deleted',
        userId: event.payload.userId,
        channels: ['email'],
        data: {
          deletedAt: event.occurredAt,
          dataRetentionDays: 30
        }
      });

    } catch (error) {
      console.error('❌ Error handling UserDeleted:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * UserLoggedIn event handler
   */
  async handleUserLoggedIn(event) {
    try {
      console.log(`📥 Handling UserLoggedIn event: ${event.payload.userId}`);

      // 1. Update last login time
      await this._updateLastLoginTime(event.payload.userId, event.occurredAt);

      // 2. Security check
      const isAnomalous = await this._detectAnomalousLogin(event);
      if (isAnomalous) {
        await this._handleAnomalousLogin(event);
      }

      // 3. Session tracking
      await this._trackUserSession(event.payload.userId, event.payload.sessionId);

      // 4. Analytics
      await this.analyticsService.track({
        event: 'user_login',
        userId: event.payload.userId,
        properties: {
          loginMethod: event.payload.method,
          device: event.payload.device,
          location: event.payload.location
        }
      });

    } catch (error) {
      console.error('❌ Error handling UserLoggedIn:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * UserLoggedOut event handler
   */
  async handleUserLoggedOut(event) {
    try {
      console.log(`📥 Handling UserLoggedOut event: ${event.payload.userId}`);

      // 1. End session
      await this._endUserSession(event.payload.userId, event.payload.sessionId);

      // 2. Clear cache
      await this._clearUserCache(event.payload.userId);

      // 3. Analytics
      const sessionDuration = await this._calculateSessionDuration(event.payload.sessionId);
      await this.analyticsService.track({
        event: 'user_logout',
        userId: event.payload.userId,
        properties: {
          sessionDuration,
          logoutType: event.payload.type // manual, timeout, forced
        }
      });

    } catch (error) {
      console.error('❌ Error handling UserLoggedOut:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * BalanceTransferred event handler
   */
  async handleBalanceTransferred(event) {
    try {
      console.log(`📥 Handling BalanceTransferred event: ${event.payload.transactionId}`);

      // 1. Update balances
      await this._updateUserBalances(
        event.payload.fromUserId,
        event.payload.toUserId,
        event.payload.amount
      );

      // 2. Transaction notifications
      await Promise.all([
        this.notificationService.sendNotification({
          type: 'money_sent',
          userId: event.payload.fromUserId,
          channels: ['in-app', 'push'],
          data: {
            amount: event.payload.amount,
            toUser: event.payload.toUserId,
            transactionId: event.payload.transactionId
          }
        }),
        this.notificationService.sendNotification({
          type: 'money_received',
          userId: event.payload.toUserId,
          channels: ['in-app', 'push', 'email'],
          data: {
            amount: event.payload.amount,
            fromUser: event.payload.fromUserId,
            transactionId: event.payload.transactionId
          }
        })
      ]);

      // 3. Fraud detection
      await this._checkTransactionForFraud(event);

    } catch (error) {
      console.error('❌ Error handling BalanceTransferred:', error);
      this.emit('event:error', { event, error });
    }
  }

  /**
   * BulkUsersImported event handler
   */
  async handleBulkUsersImported(event) {
    try {
      console.log(`📥 Handling BulkUsersImported event: ${event.payload.importId}`);

      const { userIds, source, importedBy } = event.payload;

      // 1. Batch processing
      const batchSize = 100;
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batch = userIds.slice(i, i + batchSize);
        await this._processBulkUserBatch(batch, source);
      }

      // 2. Import report
      await this._generateImportReport(event.payload.importId, userIds.length);

      // 3. Admin notification
      await this.notificationService.sendNotification({
        type: 'bulk_import_completed',
        userId: importedBy,
        channels: ['email', 'in-app'],
        data: {
          importId: event.payload.importId,
          totalUsers: userIds.length,
          source: source,
          completedAt: new Date()
        }
      });

    } catch (error) {
      console.error('❌ Error handling BulkUsersImported:', error);
      this.emit('event:error', { event, error });
    }
  }

  // Private helper metodlar
  async _processReferral(userId, referralCode) {
    // Referral logic implementation
    console.log(`Processing referral for user ${userId} with code ${referralCode}`);
  }

  async _createDefaultUserSettings(userId) {
    // Default settings creation
    console.log(`Creating default settings for user ${userId}`);
  }

  async _generateVerificationLink(userId) {
    // Generate verification link
    return `https://example.com/verify-email?user=${userId}&token=${Date.now()}`;
  }

  async _createAuditLog(action, event) {
    // Audit log creation
    console.log(`Creating audit log: ${action} for ${event.aggregateId}`);
  }

  async _calculateProfileCompleteness(profileData) {
    // Calculate profile completeness percentage
    const requiredFields = ['firstName', 'lastName', 'phone', 'address', 'birthDate'];
    const filledFields = requiredFields.filter(field => profileData[field]);
    return Math.round((filledFields.length / requiredFields.length) * 100);
  }

  async _grantProfileCompletionBonus(userId) {
    // Grant bonus for profile completion
    console.log(`Granting profile completion bonus to user ${userId}`);
  }

  async _updateSearchIndex(userId, profileData) {
    // Update search index
    console.log(`Updating search index for user ${userId}`);
  }

  async _updatePermissionCache(userId, role) {
    // Update permission cache
    console.log(`Updating permission cache for user ${userId} with role ${role}`);
  }

  async _getRolePermissions(role) {
    // Get role permissions
    const permissions = {
      user: ['read:own_profile', 'update:own_profile'],
      seller: ['read:own_profile', 'update:own_profile', 'create:product', 'read:orders'],
      admin: ['read:all', 'update:all', 'delete:all']
    };
    return permissions[role] || [];
  }

  async _initializeSellerAccount(userId) {
    // Initialize seller account
    console.log(`Initializing seller account for user ${userId}`);
  }

  async _sendAdminWelcomeKit(userId) {
    // Send admin welcome kit
    console.log(`Sending admin welcome kit to user ${userId}`);
  }

  async _terminateUserSessions(userId) {
    // Terminate user sessions
    console.log(`Terminating all sessions for user ${userId}`);
  }

  async _cancelUserScheduledJobs(userId) {
    // Cancel scheduled jobs
    console.log(`Cancelling scheduled jobs for user ${userId}`);
  }

  async _notifySecurityTeam(event) {
    // Notify security team
    console.log(`Notifying security team about event: ${event.eventName}`);
  }

  async _scheduleDataRetention(userId) {
    // Schedule data retention
    console.log(`Scheduling data retention for user ${userId}`);
  }

  async _startWelcomeBackCampaign(userId) {
    // Start welcome back campaign
    console.log(`Starting welcome back campaign for user ${userId}`);
  }

  async _restoreUserScheduledJobs(userId) {
    // Restore scheduled jobs
    console.log(`Restoring scheduled jobs for user ${userId}`);
  }

  async _revokeUserTokens(userId) {
    // Revoke user tokens
    console.log(`Revoking all tokens for user ${userId}`);
  }

  async _createSecurityAuditLog(action, event) {
    // Create security audit log
    console.log(`Creating security audit log: ${action}`);
  }

  async _checkPasswordResetRateLimit(userId) {
    // Check password reset rate limit
    return true; // Mock implementation
  }

  async _trackPasswordResetAttempt(userId) {
    // Track password reset attempt
    console.log(`Tracking password reset attempt for user ${userId}`);
  }

  async _anonymizeUserData(userId) {
    // Anonymize user data
    console.log(`Anonymizing data for user ${userId}`);
  }

  async _cancelUserSubscriptions(userId) {
    // Cancel user subscriptions
    console.log(`Cancelling subscriptions for user ${userId}`);
  }

  async _generateDataDeletionReport(userId) {
    // Generate data deletion report
    console.log(`Generating data deletion report for user ${userId}`);
  }

  async _updateLastLoginTime(userId, time) {
    // Update last login time
    console.log(`Updating last login time for user ${userId}`);
  }

  async _detectAnomalousLogin(event) {
    // Detect anomalous login
    return false; // Mock implementation
  }

  async _handleAnomalousLogin(event) {
    // Handle anomalous login
    console.log(`Handling anomalous login for user ${event.payload.userId}`);
  }

  async _trackUserSession(userId, sessionId) {
    // Track user session
    console.log(`Tracking session ${sessionId} for user ${userId}`);
  }

  async _endUserSession(userId, sessionId) {
    // End user session
    console.log(`Ending session ${sessionId} for user ${userId}`);
  }

  async _clearUserCache(userId) {
    // Clear user cache
    console.log(`Clearing cache for user ${userId}`);
  }

  async _calculateSessionDuration(sessionId) {
    // Calculate session duration
    return Math.floor(Math.random() * 3600); // Mock: random duration in seconds
  }

  async _updateUserBalances(fromUserId, toUserId, amount) {
    // Update user balances
    console.log(`Updating balances: ${fromUserId} -> ${toUserId}: ${amount}`);
  }

  async _checkTransactionForFraud(event) {
    // Check transaction for fraud
    console.log(`Checking transaction ${event.payload.transactionId} for fraud`);
  }

  async _processBulkUserBatch(userIds, source) {
    // Process bulk user batch
    console.log(`Processing batch of ${userIds.length} users from ${source}`);
  }

  async _generateImportReport(importId, totalUsers) {
    // Generate import report
    console.log(`Generating import report for ${importId}: ${totalUsers} users`);
  }
}

module.exports = UserEventHandlers; 