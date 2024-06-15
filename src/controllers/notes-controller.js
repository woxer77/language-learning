const notesDbService = require('../services/db/notes-db-service');
const translateService = require('../services/translate-service');
const { formatArrFromDbStyle, formatToDbStyle } = require("../helpers/notes/formatStyle");

// get Data and send Data
module.exports = { // TODO: вынести мб все похожее в хелпер?
  async getExpressions(req, res, next) {
    try {
      const { userId } = req.params;
      const expressions = await notesDbService.getExpressions(userId);
      const formattedExpressions = formatArrFromDbStyle(expressions);

      res.status(200).json(formattedExpressions);
    } catch (e) {
      next(e);
    }
  },
  async getWords(req, res, next) {
    try {
      const { userId } = req.params;
      const words = await notesDbService.getWords(userId);
      const formattedWords = formatArrFromDbStyle(words);

      res.status(200).json(formattedWords);
    } catch (e) {
      next(e);
    }
  },
  async createWord(req, res, next) {
    try {
      const data = req.body;
      const translatedText = await translateService.translateIntoEnglish(data.initialText);
      const reqWord = formatToDbStyle({ ...data, translatedText });
      const resWord = await notesDbService.createWord(reqWord);
      const formattedWord = formatArrFromDbStyle(resWord);

      res.status(200).json(formattedWord[0]);
    } catch (e) {
      next(e);
    }
  },
  async createExpression(req, res, next) {
    try {
      const data = req.body;
      const translatedText = await translateService.translateIntoEnglish(data.initialText);
      const reqExpression = formatToDbStyle({ ...data, translatedText });
      const resExpression = await notesDbService.createExpression(reqExpression);
      const formattedExpression = formatArrFromDbStyle(resExpression);

      res.status(200).json(formattedExpression[0]);
    } catch (e) {
      next(e);
    }
  },
  async changeType(req, res, next) {
    try {
      const { element, type, userId, notesType } = req.body;
      let resElement = null;

      if (notesType === 'word') {
        resElement = await notesDbService.changeTypeWord(element.initialText, type, userId);
      } else if (notesType === 'expression') {
        resElement = await notesDbService.changeTypeExpression(element.initialText, type, userId);
      }

      res.status(200).json(resElement[0]);
    } catch (e) {
      next(e);
    }
  }
};
