/**
 * GetUserQuery - CQRS Pattern
 * Foydalanuvchi ma'lumotlarini olish so'rovi
 */

class GetUserQuery {
  constructor(queryData) {
    this.userId = queryData.userId;
    this.email = queryData.email;
    this.username = queryData.username;
    this.includeProfile = queryData.includeProfile || false;
    this.includeRoles = queryData.includeRoles || false;
    this.queryId = this._generateQueryId();
    this.timestamp = new Date();
  }

  validate() {
    if (!this.userId && !this.email && !this.username) {
      throw new Error('userId, email yoki username dan biri majburiy');
    }
    return true;
  }

  _generateQueryId() {
    return `qry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  toJSON() {
    return {
      queryId: this.queryId,
      queryName: 'GetUserQuery',
      timestamp: this.timestamp,
      criteria: {
        userId: this.userId,
        email: this.email,
        username: this.username
      },
      options: {
        includeProfile: this.includeProfile,
        includeRoles: this.includeRoles
      }
    };
  }
}

// Query Handler - Read modeldan ma'lumot oladi
class GetUserQueryHandler {
  constructor(readModelRepository, cacheService) {
    this.readModelRepository = readModelRepository;
    this.cacheService = cacheService;
  }

  async handle(query) {
    try {
      // 1. Query validatsiyasi
      query.validate();

      // 2. Cache'dan qidirish
      const cacheKey = this._buildCacheKey(query);
      const cachedResult = await this.cacheService.get(cacheKey);
      
      if (cachedResult) {
        return {
          success: true,
          data: cachedResult,
          fromCache: true,
          queryId: query.queryId
        };
      }

      // 3. Read modeldan qidirish
      let user = null;
      
      if (query.userId) {
        user = await this.readModelRepository.findById(query.userId);
      } else if (query.email) {
        user = await this.readModelRepository.findByEmail(query.email);
      } else if (query.username) {
        user = await this.readModelRepository.findByUsername(query.username);
      }

      if (!user) {
        return {
          success: false,
          error: 'Foydalanuvchi topilmadi',
          queryId: query.queryId
        };
      }

      // 4. Qo'shimcha ma'lumotlarni yuklash
      const result = {
        id: user.id,
        email: user.email,
        username: user.username,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt
      };

      if (query.includeProfile && user.profileId) {
        result.profile = await this.readModelRepository.getProfile(user.profileId);
      }

      if (query.includeRoles) {
        result.roles = await this.readModelRepository.getUserRoles(user.id);
      }

      // 5. Cache'ga saqlash
      await this.cacheService.set(cacheKey, result, 300); // 5 daqiqa

      // 6. Natijani qaytarish
      return {
        success: true,
        data: result,
        fromCache: false,
        queryId: query.queryId
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        queryId: query.queryId
      };
    }
  }

  _buildCacheKey(query) {
    if (query.userId) return `user:id:${query.userId}`;
    if (query.email) return `user:email:${query.email}`;
    if (query.username) return `user:username:${query.username}`;
  }
}

module.exports = {
  GetUserQuery,
  GetUserQueryHandler
}; 