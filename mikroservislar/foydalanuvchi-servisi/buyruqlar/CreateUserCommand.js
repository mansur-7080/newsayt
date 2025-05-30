/**
 * CreateUserCommand - CQRS Pattern
 * Yangi foydalanuvchi yaratish buyrug'i
 */

const UserAggregate = require('../biznes-logika/aggregates/UserAggregate');
const crypto = require('crypto');

class CreateUserCommand {
  constructor(commandData) {
    this.email = commandData.email;
    this.username = commandData.username;
    this.password = commandData.password;
    this.firstName = commandData.firstName;
    this.lastName = commandData.lastName;
    this.timestamp = new Date();
    this.commandId = this._generateCommandId();
  }

  // Command validatsiyasi
  validate() {
    const errors = [];

    if (!this.email) {
      errors.push('Email majburiy');
    }

    if (!this.username || this.username.length < 3) {
      errors.push('Username kamida 3 ta belgidan iborat bo\'lishi kerak');
    }

    if (!this.password || this.password.length < 8) {
      errors.push('Parol kamida 8 ta belgidan iborat bo\'lishi kerak');
    }

    if (!this._isPasswordStrong(this.password)) {
      errors.push('Parol yetarlicha kuchli emas (harf, raqam va belgi bo\'lishi kerak)');
    }

    if (errors.length > 0) {
      throw new Error(`Validatsiya xatolari: ${errors.join(', ')}`);
    }

    return true;
  }

  // Parol kuchini tekshirish
  _isPasswordStrong(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    return hasLetter && hasNumber && hasSpecial;
  }

  // Command ID generatsiyasi
  _generateCommandId() {
    return `cmd_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  }

  // Command ma'lumotlari
  toJSON() {
    return {
      commandId: this.commandId,
      commandName: 'CreateUserCommand',
      timestamp: this.timestamp,
      payload: {
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName
      }
    };
  }
}

// Command Handler
class CreateUserCommandHandler {
  constructor(userRepository, eventStore, passwordHasher) {
    this.userRepository = userRepository;
    this.eventStore = eventStore;
    this.passwordHasher = passwordHasher;
  }

  async handle(command) {
    try {
      // 1. Command validatsiyasi
      command.validate();

      // 2. Email va username unikal ekanligini tekshirish
      const existingUserByEmail = await this.userRepository.findByEmail(command.email);
      if (existingUserByEmail) {
        throw new Error('Bu email allaqachon ro\'yxatdan o\'tgan');
      }

      const existingUserByUsername = await this.userRepository.findByUsername(command.username);
      if (existingUserByUsername) {
        throw new Error('Bu username band');
      }

      // 3. Parolni hash qilish
      const passwordHash = await this.passwordHasher.hash(command.password);

      // 4. User ID generatsiya qilish
      const userId = this._generateUserId();

      // 5. User aggregate yaratish
      const userAggregate = UserAggregate.create({
        id: userId,
        email: command.email,
        username: command.username,
        passwordHash: passwordHash
      });

      // 6. Profile ma'lumotlarini qo'shish
      if (command.firstName || command.lastName) {
        userAggregate.updateProfile({
          firstName: command.firstName,
          lastName: command.lastName
        });
      }

      // 7. Agregat saqlash
      await this.userRepository.save(userAggregate);

      // 8. Domain eventlarni event store'ga yozish
      const events = userAggregate.getDomainEvents();
      for (const event of events) {
        await this.eventStore.append(event);
      }

      // 9. Natijani qaytarish
      return {
        success: true,
        userId: userId,
        commandId: command.commandId,
        message: 'Foydalanuvchi muvaffaqiyatli yaratildi'
      };

    } catch (error) {
      // 10. Xatolarni qayta ishlash
      return {
        success: false,
        commandId: command.commandId,
        error: error.message
      };
    }
  }

  _generateUserId() {
    return `user_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
  }
}

module.exports = {
  CreateUserCommand,
  CreateUserCommandHandler
}; 