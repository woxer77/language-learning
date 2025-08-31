const router = require('express').Router();
const SentencesController = require('../controllers/sentences-controller');

router.get('/:userId/:videoId', SentencesController.getSentences);
router.post('/add-sentence', SentencesController.createSentence);

module.exports = router;
