const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const tokenDbService = require('./db/token-db-service');

module.exports = {
  generateTokens(payload) {
    const accessToken = jwt.sign(
      payload,
      config.JWT_ACCESS_SECRET,
      { expiresIn: config.JWT_ACCESS_EXPIRES }
    );
    const refreshToken = jwt.sign(
      payload,
      config.JWT_REFRESH_SECRET,
      { expiresIn: config.JWT_REFRESH_EXPIRES }
    );

    return { accessToken, refreshToken };
  },

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, config.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  },

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, config.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  },

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenDbService.getTokenById(userId);
    const newTokenData = {
      user_id: userId,
      refresh_token: refreshToken
    };

    if (tokenData) {
      await tokenDbService.updateToken(userId, newTokenData);
      return 1;
    }

    await tokenDbService.createToken(newTokenData);
    return 0;
  },

  async removeToken(refreshToken) {
    await tokenDbService.removeToken(refreshToken);
    return 1;
  },

  async findToken(refreshToken) {
    const tokenData = await tokenDbService.getTokenByToken(refreshToken);
    return tokenData;
  }
};
