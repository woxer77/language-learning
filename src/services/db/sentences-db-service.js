const db = require('../../configs/db');

module.exports = {
  getSentences: async (videoId) => db.select().from('sentences').where('video_id', videoId),
  addSentence: async (body) => db('sentences').returning('*').insert(body)
};
