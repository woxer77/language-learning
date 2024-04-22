const authService = require("../services/auth-service");

const tokenTimelineToMs = require("../helpers/tokenTimelineToMs");

const config = require("../configs/config");

// get Data and send Data
module.exports = {
  async registration(req, res, next) {
    try {
      const user = req.body;
      const userData = await authService.registration(user);
      const refreshMaxAge = tokenTimelineToMs(config.JWT_REFRESH_EXPIRES);

      const hasSSL = config.DEVELOPMENT_STAGE === 'production'; // if SSL certificate is valid
      const sameSite = config.DEVELOPMENT_STAGE === 'production' ? 'none' : 'strict';

      res.cookie('refreshToken', userData.refreshToken, { maxAge: refreshMaxAge, httpOnly: true, secure: hasSSL, sameSite: sameSite });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await authService.login(email, password);
      const refreshMaxAge = tokenTimelineToMs(config.JWT_REFRESH_EXPIRES);

      const hasSSL = config.DEVELOPMENT_STAGE === 'production'; // if SSL certificate is valid
      const sameSite = config.DEVELOPMENT_STAGE === 'production' ? 'none' : 'strict';

      res.cookie('refreshToken', userData.refreshToken, { maxAge: refreshMaxAge, httpOnly: true, secure: hasSSL, sameSite: sameSite });

      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  },
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.status(200).json({ message: 'You have successfully logged out of your account' });
    } catch (e) {
      return next(e);
    }
  },

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      const refreshMaxAge = tokenTimelineToMs(config.JWT_REFRESH_EXPIRES);

      const hasSSL = config.DEVELOPMENT_STAGE === 'production'; // if SSL certificate is valid
      const sameSite = config.DEVELOPMENT_STAGE === 'production' ? 'none' : 'strict';

      res.cookie('refreshToken', userData.refreshToken, { maxAge: refreshMaxAge, httpOnly: true, secure: hasSSL, sameSite: sameSite });

      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  },
};
