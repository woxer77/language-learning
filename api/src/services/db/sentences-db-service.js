const db = require('../../configs/db');

module.exports = {
  getSentences: async (userId, videoId) => db.select().from('sentences').where('user_id', userId).andWhere('video_id', videoId),
  createSentence: async (data) => db('sentences').returning('*').insert(data)
}
