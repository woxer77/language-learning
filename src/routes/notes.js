const router = require('express').Router();
const NotesController = require('../controllers/notes-controller');
const AuthMiddleware = require('../middlewares/auth-middleware');

router.get('/expressions/:userId', NotesController.getExpressions);
router.get('/words/:userId',  NotesController.getWords);
router.post('/word',  NotesController.createWord);
router.post('/expression',  NotesController.createExpression);
router.put('/change-type',  NotesController.changeType);

module.exports = router;
