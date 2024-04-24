const { hash, compare } = require("bcrypt");

const userDbService = require("../services/db/user-db-service");
const tokenService = require("../services/token-service");

const ApiError = require("../exceptions/api-error");

module.exports = {
  async registration(user) {
    try {
      const candidate = await userDbService.getUserByEmail(user.email);
      if (candidate) return ApiError.BadRequest('The user with provided email does already exist');

      const hashedPassword = await hash(user.password, 10);

      const userId = await userDbService.createUser({
        email: user.email,
        password: hashedPassword
      });

      const userPayload = {
        userId: userId
      };
      const { accessToken, refreshToken } = tokenService.generateTokens(userPayload);
      await tokenService.saveToken(userId, refreshToken);

      return { accessToken, refreshToken, userPayload };
    } catch (error) {
      console.log(error)
    }
  },
  async login(email, password) {
    const user = await userDbService.getUserByEmail(email);
    if (!user) {
      throw ApiError.BadRequest('User with this email was not found.');
    }

    const isPasswordsEqual = await compare(password, user.password);
    if (!isPasswordsEqual) {
      throw ApiError.BadRequest('Incorrect password.');
    }

    const userPayload = {
      userId: user.user_id
    };
    const tokens = tokenService.generateTokens(userPayload);
    await tokenService.saveToken(user.user_id, tokens.refreshToken);

    return { ...tokens, user: userPayload };
  },
  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
    return 1;
  },
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedException();
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedException();
    }

    const user = await userDbService.getUserById(tokenFromDb.user_id);

    const userPayload = {
      userId: user.user_id
    };
    const tokens = tokenService.generateTokens(userPayload);
    await tokenService.saveToken(user.user_id, tokens.refreshToken);

    return { ...tokens, user: userPayload };
  },
};
