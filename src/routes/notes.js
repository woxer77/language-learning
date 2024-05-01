const router = require('express').Router();
const NotesController = require('../controllers/notes-controller');
const AuthMiddleware = require('../middlewares/auth-middleware');

router.get('/expressions', NotesController.getExpressions);
router.get('/words',  NotesController.getWords);
router.post('/word',  NotesController.addWord);
router.post('/expression',  NotesController.addExpression);

module.exports = router;
