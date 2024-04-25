const router = require('express').Router();
const YoutubeController = require('../controllers/youtube-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/playlist/:id', authMiddleware, YoutubeController.getPlaylistData);
router.post('/playlist/get-page', authMiddleware, YoutubeController.getPlaylistPage);
router.get('/video/:id', authMiddleware, YoutubeController.getVideoData);

module.exports = router;
