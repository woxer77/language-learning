const db = require('../../configs/db');

module.exports = {
  getTokenById: async (id) => db.select().first().from('sessions').where('user_id', id),
  getTokenByToken: async (token) => db.select().first().from('sessions').where('refresh_token', token),
  createToken: async (body) => db("sessions").insert(body),
  updateToken: async (id, body) => db.select().first().from('sessions').where('user_id', id)
    .update(body),
  removeToken: async (token) => db.select().from('sessions').where('refresh_token', token).del()
};
