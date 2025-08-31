const sentencesService = require('../services/db/sentences-db-service');
const { formatArrFromDbStyle, formatToDbStyle } = require("../helpers/sentences/formatStyle");

// get Data and send Data
module.exports = {
  async getSentences(req, res, next) {
    try {
      const { userId, videoId } = req.params;
      const sentences = await sentencesService.getSentences(userId, videoId);

      res.status(200).json(sentences);
    } catch (e) {
      next(e);
    }
  },
  async createSentence(req, res, next) {
    try {
      const data = req.body;
      const reqSentence = formatToDbStyle(data);

      const resSentence = await sentencesService.createSentence(reqSentence);
      const formattedSentence = formatArrFromDbStyle(resSentence);

      res.status(200).json(formattedSentence[0]);
    } catch (e) {
      next(e);
    }
  }
};
