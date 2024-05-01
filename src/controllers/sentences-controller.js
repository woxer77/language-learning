const sentencesService = require('../services/db/sentences-db-service');
const { formatArrFromDbStyle, formatToDbStyle } = require("../helpers/sentences/formatStyle");

// get Data and send Data
module.exports = {
  async getSentences(req, res, next) {
    try {
      const videoId = req.params.id;
      const sentences = await sentencesService.getSentences(videoId);

      res.status(200).json(sentences);
    } catch (e) {
      next(e);
    }
  },
  async addSentence(req, res, next) {
    try {
      const reqSentence = formatToDbStyle(req.body);
      console.log(reqSentence);
      const resSentence = await sentencesService.addSentence(reqSentence);
      const formattedSentence = formatArrFromDbStyle(resSentence);

      res.status(200).json(formattedSentence);
    } catch (e) {
      next(e);
    }
  }
};
