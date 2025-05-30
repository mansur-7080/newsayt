/**
 * Email Value Object - Domain-Driven Design
 * Email immutable (o'zgarmas) qiymat obyekti
 */

class Email {
  constructor(value) {
    this._validate(value);
    this._value = value.toLowerCase().trim();
    Object.freeze(this); // Immutable qilish
  }

  get value() {
    return this._value;
  }

  // Email domenini olish
  get domain() {
    return this._value.split('@')[1];
  }

  // Email local qismini olish
  get localPart() {
    return this._value.split('@')[0];
  }

  // Validatsiya
  _validate(email) {
    if (!email) {
      throw new Error('Email bo\'sh bo\'lishi mumkin emas');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email formati noto\'g\'ri');
    }

    // Maxsus domenlarni tekshirish
    const bannedDomains = ['tempmail.com', 'throwaway.email'];
    const domain = email.split('@')[1];
    if (bannedDomains.includes(domain)) {
      throw new Error('Vaqtinchalik email manzillari qabul qilinmaydi');
    }
  }

  // Tenglikni tekshirish
  equals(otherEmail) {
    if (!(otherEmail instanceof Email)) {
      return false;
    }
    return this._value === otherEmail.value;
  }

  // String formatida qaytarish
  toString() {
    return this._value;
  }

  // JSON formatida
  toJSON() {
    return this._value;
  }

  // Static factory method
  static create(value) {
    return new Email(value);
  }

  // Bo'sh email tekshirish
  static isValid(value) {
    try {
      new Email(value);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = Email; 