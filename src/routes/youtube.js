const router = require('express').Router();
const YoutubeController = require('../controllers/youtube-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/playlist/:playlistId', authMiddleware, YoutubeController.getPlaylistData);
router.get('/playlist/:playlistId/:videoId', authMiddleware, YoutubeController.getPlaylistData);
router.get('/video/:videoId', authMiddleware, YoutubeController.getVideoData);

router.post('/playlist/get-page', authMiddleware, YoutubeController.getPlaylistPage);

router.post('/playlist/get-history', YoutubeController.getPlaylistsHistory);

module.exports = router;
