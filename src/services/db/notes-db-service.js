const db = require('../../configs/db');

module.exports = {
  getExpressions: async () => db.select().from('expressions').orderBy('time', 'desc'),
  getWords: async () => db.select().from('words').orderBy('time', 'desc'),
  addWord: async (data) => db('words').returning('*').insert(data),
  addExpression: async (data) => db('expressions').returning('*').insert(data)
};
