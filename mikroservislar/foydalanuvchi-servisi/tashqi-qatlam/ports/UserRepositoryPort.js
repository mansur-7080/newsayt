/**
 * UserRepositoryPort - Hexagonal Architecture Port
 * Biznes logika va tashqi qatlam orasidagi shartnoma
 */

class UserRepositoryPort {
  /**
   * User aggregate'ni saqlash
   * @param {UserAggregate} userAggregate 
   * @returns {Promise<void>}
   */
  async save(userAggregate) {
    throw new Error('save() metodi implementatsiya qilinishi kerak');
  }

  /**
   * ID bo'yicha foydalanuvchini topish
   * @param {string} id 
   * @returns {Promise<UserAggregate|null>}
   */
  async findById(id) {
    throw new Error('findById() metodi implementatsiya qilinishi kerak');
  }

  /**
   * Email bo'yicha foydalanuvchini topish
   * @param {string} email 
   * @returns {Promise<UserAggregate|null>}
   */
  async findByEmail(email) {
    throw new Error('findByEmail() metodi implementatsiya qilinishi kerak');
  }

  /**
   * Username bo'yicha foydalanuvchini topish
   * @param {string} username 
   * @returns {Promise<UserAggregate|null>}
   */
  async findByUsername(username) {
    throw new Error('findByUsername() metodi implementatsiya qilinishi kerak');
  }

  /**
   * Foydalanuvchini o'chirish
   * @param {string} id 
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('delete() metodi implementatsiya qilinishi kerak');
  }

  /**
   * Barcha foydalanuvchilarni olish (pagination bilan)
   * @param {number} page 
   * @param {number} limit 
   * @returns {Promise<{users: UserAggregate[], total: number}>}
   */
  async findAll(page = 1, limit = 10) {
    throw new Error('findAll() metodi implementatsiya qilinishi kerak');
  }

  /**
   * Foydalanuvchi mavjudligini tekshirish
   * @param {string} id 
   * @returns {Promise<boolean>}
   */
  async exists(id) {
    throw new Error('exists() metodi implementatsiya qilinishi kerak');
  }
}

module.exports = UserRepositoryPort; 