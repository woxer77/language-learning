const db = require('../../configs/db');

module.exports = {
  getExpressions: async (userId) => db.select().from('expressions').where('user_id', userId).orderBy('time', 'desc'),
  getWords: async (userId) => db.select().from('words').where('user_id', userId).orderBy('time', 'desc'),
  createWord: async (data) => db('words').returning('*').insert(data),
  createExpression: async (data) => db('expressions').returning('*').insert(data),
  changeTypeWord: async (initialText, type, userId) => db.select().from('words').where('user_id', userId).andWhere('initial_text', initialText).update({ type: type }).returning('*'),
  changeTypeExpression: async (initialText, type, userId) => db.select().from('expressions').where('user_id', userId).andWhere('initial_text', initialText).update({ type: type }).returning('*'),
};
