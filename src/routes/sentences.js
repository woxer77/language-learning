const router = require('express').Router();
const SentencesController = require('../controllers/sentences-controller');

router.get('/:id', SentencesController.getSentences);
router.post('/add-sentence', SentencesController.addSentence);

module.exports = router;
