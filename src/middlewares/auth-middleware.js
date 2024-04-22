const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedException());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedException());
    }

    const adminData = tokenService.validateAccessToken(accessToken);
    if (!adminData) {
      return next(ApiError.UnauthorizedException());
    }

    req.admin = adminData;
    return next();
  } catch (e) {
    return next(ApiError.UnauthorizedException());
  }
};
