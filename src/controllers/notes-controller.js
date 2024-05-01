const notesDbService = require('../services/db/notes-db-service');
const { formatArrFromDbStyle, formatToDbStyle } = require("../helpers/notes/formatStyle");

// get Data and send Data
module.exports = { // TODO: вынести мб все похожее в хелпер?
  async getExpressions(req, res, next) {
    try {
      const expressions = await notesDbService.getExpressions();
      const formattedExpressions = formatArrFromDbStyle(expressions);

      res.status(200).json(formattedExpressions);
    } catch (e) {
      next(e);
    }
  },
  async getWords(req, res, next) {
    try {
      const words = await notesDbService.getWords();
      const formattedWords = formatArrFromDbStyle(words);

      res.status(200).json(formattedWords);
    } catch (e) {
      next(e);
    }
  },
  async addWord(req, res, next) {
    try {
      const reqWord = formatToDbStyle(req.body);
      const resWord = await notesDbService.addWord(reqWord);
      const formattedWords = formatArrFromDbStyle(resWord);

      res.status(200).json(formattedWords);
    } catch (e) {
      next(e);
    }
  },
  async addExpression(req, res, next) {
    try {
      const reqExpression = formatToDbStyle(req.body);
      const resExpression = await notesDbService.addExpression(reqExpression);
      const formattedExpressions = formatArrFromDbStyle(resExpression);

      res.status(200).json(formattedExpressions);
    } catch (e) {
      next(e);
    }
  }
};
