const youtubeService = require('../services/youtube-service');

const config = require('../configs/config');
const { fetchPlaylistData } = require("../helpers/youtube/fetchPlaylistData");
const { fetchVideoData } = require("../helpers/youtube/fetchVideoData");
const { getPlaylistsHistory } = require("../helpers/youtube/getPlaylistsHistory");

// get Data and send Data
module.exports = {
  async getPlaylistData(req, res, next) {
    try {
      const { playlistId, videoId } = req.params;
      const queryData = {
        apiKey: config.YT_CONSOLE_API_KEY,
        part: 'snippet',
        playlistId: playlistId,
        maxResults: config.MAX_ITEMS_IN_PACK
      };

      let mediaData = await fetchPlaylistData(queryData, '');

      if (videoId) {
        let foundVideoPosition = mediaData.items.find((elem) => elem.videoId === videoId)?.position;

        while (foundVideoPosition === undefined) {
          mediaData = await fetchPlaylistData(queryData, mediaData.nextPageToken);
          foundVideoPosition = mediaData.items.find((elem) => elem.videoId === videoId)?.position;
        }
      }

      res.status(200).json(mediaData);
    } catch (e) {
      next(e);
    }
  },

  async getPlaylistsHistory(req, res, next) {
    try {
      const { history, lastVisitedVideos } = req.body;
      const queryData = {
        apiKey: config.YT_CONSOLE_API_KEY,
        part: 'snippet',
        playlistId: '',
        maxResults: config.MAX_ITEMS_IN_PACK
      };

      const playlistsHistory = await getPlaylistsHistory(history, lastVisitedVideos, queryData);

      res.status(200).json(playlistsHistory);
    } catch (e) {
      next(e);
    }
  },

  async getVideoData(req, res, next) {
    try {
      const { videoId } = req.params;
      const queryData = {
        apiKey: config.YT_CONSOLE_API_KEY,
        part: 'snippet',
        videoId,
        maxResults: config.MAX_ITEMS_IN_PACK
      };

      const mediaData = await fetchVideoData(queryData);

      res.status(200).json(mediaData);
    } catch (e) {
      next(e);
    }
  },

  async getPlaylistPage(req, res, next) {
    try {
      const { playlistId, itemPosition, nextPageToken, prevPageToken } = req.body;
      const queryData = {
        apiKey: config.YT_CONSOLE_API_KEY,
        part: 'snippet',
        playlistId: playlistId,
        maxResults: config.MAX_ITEMS_IN_PACK
      };

      const tokens = { nextPageToken, prevPageToken };

      const playlistData = await youtubeService.getPlaylistData(queryData, itemPosition, tokens);

      res.status(200).json({ playlistData, itemPosition });
    } catch (e) {
      next(e);
    }
  }
};
