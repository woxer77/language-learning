const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedException());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedException());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    console.log(userData);
    if (!userData) {
      return next(ApiError.UnauthorizedException());
    }

    req.user = userData;
    return next();
  } catch (e) {
    return next(ApiError.UnauthorizedException());
  }
};
