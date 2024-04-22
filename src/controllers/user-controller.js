const userDbService = require("../services/db/user-db-service");

// get Data and send Data
module.exports = {
  async getUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await userDbService.getUserById(userId);

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },
};
