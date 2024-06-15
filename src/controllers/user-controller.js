const userDbService = require("../services/db/user-db-service");
const { MAX_HISTORY_LENGTH } = require('../configs/config');

// get Data and send Data
module.exports = {
  async getUserById(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await userDbService.getUserById(userId);

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },

  async setHistory(req, res, next) {
    try {
      const { userId, playlistId } = req.body;
      const { history } = await userDbService.getHistory(userId);

      let playlistsArr = [];

      if (!history) {
        playlistsArr.unshift(playlistId);
      } else {
        playlistsArr = history.split(',');

        if (playlistsArr.length === MAX_HISTORY_LENGTH) {
          playlistsArr.pop();
        }

        playlistsArr.unshift(playlistId);
      }

      await userDbService.setHistory(userId, playlistsArr.join(','));
      res.status(200).send(playlistsArr);
    } catch (error) {
      next(error);
    }
  }
};
