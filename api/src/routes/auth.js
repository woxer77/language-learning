const router = require('express').Router();
const AuthController = require('../controllers/auth-controller');

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/refresh', AuthController.refresh);

module.exports = router;
