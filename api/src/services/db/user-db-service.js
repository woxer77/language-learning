const db = require('../../configs/db');

module.exports = {
  getUserById: async (id) => db.select().first().from('users').where('user_id', id),
  getUserByEmail: async (email) => db.select().first().from('users').where('email', email),
  createUser: async (data) => db('users').insert(data).returning('user_id').then((insertedUser) => {
    const { user_id } = insertedUser[0];
    return user_id;
  })
    .catch((error) => {
      console.error('Error inserting new user:', error);
    }),
  setHistory: async (userId, history) => db('users').update({ history: history }).where('user_id', userId),
  getHistory: async (userId) => db.select('history').first().from('users').where('user_id', userId),
};
