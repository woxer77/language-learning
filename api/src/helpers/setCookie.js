const tokenTimelineToMs = require('./tokenTimelineToMs');
const config = require('../configs/config');

module.exports = function setCookie(res, data) {
  const refreshMaxAge = tokenTimelineToMs(config.JWT_REFRESH_EXPIRES);
  const hasSSL = config.DEVELOPMENT_STAGE === 'production'; // if SSL certificate is valid
  const sameSite = config.DEVELOPMENT_STAGE === 'production' ? 'none' : 'strict';

  res.cookie('refreshToken', data.refreshToken, {
    maxAge: refreshMaxAge,
    httpOnly: true,
    secure: hasSSL,
    sameSite: sameSite
  });
};
