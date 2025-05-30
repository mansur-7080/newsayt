/**
 * UserDomainService - Domain-Driven Design
 * Biznes logikasi va domain qoidalari
 */

const UserAggregate = require('../aggregates/UserAggregate');
const Email = require('../value-objects/Email');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class UserDomainService {
  constructor(userRepository, eventStore, emailService) {
    this.userRepository = userRepository;
    this.eventStore = eventStore;
    this.emailService = emailService;
  }

  /**
   * Foydalanuvchi yaratish biznes qoidalari
   */
  async createUser(userData) {
    // 1. Email validatsiya
    const email = new Email(userData.email);
    
    // 2. Username validatsiya
    this._validateUsername(userData.username);
    
    // 3. Parol kuchini tekshirish
    this._validatePasswordStrength(userData.password);
    
    // 4. Unikal email va username tekshirish
    await this._ensureUniqueEmail(email.value);
    await this._ensureUniqueUsername(userData.username);
    
    // 5. Parolni hash qilish
    const passwordHash = await this._hashPassword(userData.password);
    
    // 6. User ID generatsiya
    const userId = this._generateUserId();
    
    // 7. User aggregate yaratish
    const userAggregate = UserAggregate.create({
      id: userId,
      email: email.value,
      username: userData.username,
      passwordHash: passwordHash
    });
    
    // 8. Default rol berish
    userAggregate.assignRole('user');
    
    // 9. Saqlash
    await this.userRepository.save(userAggregate);
    
    // 10. Welcome email yuborish
    await this._sendWelcomeEmail(email.value, userData.username);
    
    return userAggregate;
  }

  /**
   * Email o'zgartirish biznes qoidalari
   */
  async changeUserEmail(userId, newEmailValue, confirmationCode) {
    // 1. User aggregate olish
    const userAggregate = await this.userRepository.findById(userId);
    if (!userAggregate) {
      throw new Error('Foydalanuvchi topilmadi');
    }
    
    // 2. Email validatsiya
    const newEmail = new Email(newEmailValue);
    
    // 3. Confirmation code tekshirish
    if (!await this._verifyEmailConfirmationCode(userId, confirmationCode)) {
      throw new Error('Tasdiqlash kodi noto\'g\'ri');
    }
    
    // 4. Yangi email unikal ekanligini tekshirish
    await this._ensureUniqueEmail(newEmail.value);
    
    // 5. Email o'zgartirish
    const oldEmail = userAggregate.user.email;
    userAggregate.changeEmail(newEmail.value);
    
    // 6. Saqlash
    await this.userRepository.save(userAggregate);
    
    // 7. Notification yuborish
    await this._sendEmailChangedNotification(oldEmail, newEmail.value);
    
    return userAggregate;
  }

  /**
   * Parol o'zgartirish
   */
  async changePassword(userId, currentPassword, newPassword) {
    // 1. User olish
    const userAggregate = await this.userRepository.findById(userId);
    if (!userAggregate) {
      throw new Error('Foydalanuvchi topilmadi');
    }
    
    // 2. Joriy parolni tekshirish
    const isValidPassword = await this._verifyPassword(
      currentPassword, 
      userAggregate.user._passwordHash
    );
    
    if (!isValidPassword) {
      throw new Error('Joriy parol noto\'g\'ri');
    }
    
    // 3. Yangi parol kuchini tekshirish
    this._validatePasswordStrength(newPassword);
    
    // 4. Yangi parolni hash qilish
    const newPasswordHash = await this._hashPassword(newPassword);
    
    // 5. User entity'da yangilash
    userAggregate.user._passwordHash = newPasswordHash;
    userAggregate.user._updatedAt = new Date();
    
    // 6. Event qo'shish
    userAggregate._addDomainEvent({
      eventName: 'UserPasswordChanged',
      aggregateId: userId,
      occurredAt: new Date(),
      payload: {
        userId: userId,
        changedAt: new Date()
      }
    });
    
    // 7. Saqlash
    await this.userRepository.save(userAggregate);
    
    // 8. Security notification
    await this._sendPasswordChangedNotification(userAggregate.user.email);
    
    return true;
  }

  /**
   * Foydalanuvchini faollashtirish
   */
  async activateUser(userId, activationCode) {
    const userAggregate = await this.userRepository.findById(userId);
    if (!userAggregate) {
      throw new Error('Foydalanuvchi topilmadi');
    }
    
    // Activation code tekshirish
    if (!await this._verifyActivationCode(userId, activationCode)) {
      throw new Error('Faollashtirish kodi noto\'g\'ri');
    }
    
    // Faollashtirish
    userAggregate.user.activate();
    
    // Event qo'shish
    userAggregate._addDomainEvent({
      eventName: 'UserActivated',
      aggregateId: userId,
      occurredAt: new Date(),
      payload: {
        userId: userId,
        activatedAt: new Date()
      }
    });
    
    await this.userRepository.save(userAggregate);
    
    return userAggregate;
  }

  /**
   * Parolni tiklash so'rovi
   */
  async requestPasswordReset(email) {
    const userAggregate = await this.userRepository.findByEmail(email);
    if (!userAggregate) {
      // Security uchun xato bermaylik
      return true;
    }
    
    // Reset token yaratish
    const resetToken = this._generateResetToken();
    const resetExpiry = new Date(Date.now() + 3600000); // 1 soat
    
    // Event saqlash
    await this.eventStore.append({
      eventName: 'PasswordResetRequested',
      aggregateId: userAggregate.user.id,
      occurredAt: new Date(),
      payload: {
        userId: userAggregate.user.id,
        resetToken: resetToken,
        expiresAt: resetExpiry
      }
    });
    
    // Email yuborish
    await this._sendPasswordResetEmail(email, resetToken);
    
    return true;
  }

  /**
   * Foydalanuvchilar o'rtasida pul o'tkazish
   */
  async transferBalance(fromUserId, toUserId, amount) {
    // Domain logic: ikkala foydalanuvchi ham mavjud bo'lishi kerak
    const [fromUser, toUser] = await Promise.all([
      this.userRepository.findById(fromUserId),
      this.userRepository.findById(toUserId)
    ]);
    
    if (!fromUser || !toUser) {
      throw new Error('Foydalanuvchilardan biri topilmadi');
    }
    
    // Biznes qoidasi: faqat faol foydalanuvchilar pul o'tkazishi mumkin
    if (!fromUser.user.isActive || !toUser.user.isActive) {
      throw new Error('Foydalanuvchilar faol emas');
    }
    
    // Transaction event yaratish
    const transactionId = this._generateTransactionId();
    
    await this.eventStore.append({
      eventName: 'BalanceTransferred',
      aggregateId: transactionId,
      occurredAt: new Date(),
      payload: {
        transactionId,
        fromUserId,
        toUserId,
        amount,
        timestamp: new Date()
      }
    });
    
    return transactionId;
  }

  /**
   * Bulk operatsiyalar uchun
   */
  async bulkAssignRole(userIds, role) {
    const results = [];
    
    for (const userId of userIds) {
      try {
        const userAggregate = await this.userRepository.findById(userId);
        if (userAggregate) {
          userAggregate.assignRole(role);
          await this.userRepository.save(userAggregate);
          results.push({ userId, success: true });
        } else {
          results.push({ userId, success: false, error: 'User not found' });
        }
      } catch (error) {
        results.push({ userId, success: false, error: error.message });
      }
    }
    
    return results;
  }

  // Private metodlar
  _validateUsername(username) {
    if (!username || username.length < 3) {
      throw new Error('Username kamida 3 ta belgidan iborat bo\'lishi kerak');
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      throw new Error('Username faqat harf, raqam, _ va - belgilardan iborat bo\'lishi kerak');
    }
  }

  _validatePasswordStrength(password) {
    if (!password || password.length < 8) {
      throw new Error('Parol kamida 8 ta belgidan iborat bo\'lishi kerak');
    }
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    
    if (!hasLetter || !hasNumber || !hasSpecial) {
      throw new Error('Parol harf, raqam va maxsus belgilardan iborat bo\'lishi kerak');
    }
  }

  async _ensureUniqueEmail(email) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Bu email allaqachon ro\'yxatdan o\'tgan');
    }
  }

  async _ensureUniqueUsername(username) {
    const existing = await this.userRepository.findByUsername(username);
    if (existing) {
      throw new Error('Bu username band');
    }
  }

  async _hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async _verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  _generateUserId() {
    return `user_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
  }

  _generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  _generateTransactionId() {
    return `txn_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
  }

  async _verifyEmailConfirmationCode(userId, code) {
    // Mock implementation
    return code === '123456';
  }

  async _verifyActivationCode(userId, code) {
    // Mock implementation
    return code === 'ACTIVATE';
  }

  async _sendWelcomeEmail(email, username) {
    if (this.emailService) {
      await this.emailService.send({
        to: email,
        subject: 'Xush kelibsiz!',
        template: 'welcome',
        data: { username }
      });
    }
  }

  async _sendEmailChangedNotification(oldEmail, newEmail) {
    if (this.emailService) {
      await Promise.all([
        this.emailService.send({
          to: oldEmail,
          subject: 'Email manzilingiz o\'zgartirildi',
          template: 'email-changed',
          data: { newEmail }
        }),
        this.emailService.send({
          to: newEmail,
          subject: 'Email tasdiqlandi',
          template: 'email-confirmed',
          data: { oldEmail }
        })
      ]);
    }
  }

  async _sendPasswordChangedNotification(email) {
    if (this.emailService) {
      await this.emailService.send({
        to: email,
        subject: 'Parolingiz o\'zgartirildi',
        template: 'password-changed',
        data: { changedAt: new Date() }
      });
    }
  }

  async _sendPasswordResetEmail(email, resetToken) {
    if (this.emailService) {
      await this.emailService.send({
        to: email,
        subject: 'Parolni tiklash',
        template: 'password-reset',
        data: { 
          resetLink: `https://example.com/reset-password?token=${resetToken}` 
        }
      });
    }
  }
}

module.exports = UserDomainService; 