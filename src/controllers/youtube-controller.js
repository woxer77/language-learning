const axios = require('axios');

const youtubeService = require('../services/youtube-service');

const config = require('../configs/config');

// get Data and send Data
module.exports = {
  async getPlaylistData(req, res, next) {
    try {
      const { id: playlistId } = req.params;
      const { YT_CONSOLE_API_KEY } = config;
      const part = 'snippet';
      const maxResults = 50;
      const query = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YT_CONSOLE_API_KEY}&part=${part}&playlistId=${playlistId}&maxResults=${maxResults}`;

      const response = await axios.get(query);
      console.log(response);
      const playlistInfo = {
        type: 'playlist',
        data: response.data
      };

      res.status(200).json(playlistInfo);
      // res.status(200).json(playlistInfo);
    } catch (e) {
      next(e);
    }
  },

  async getVideoData(req, res, next) {
    try {
      const { id: videoId } = req.params;
      const { YT_CONSOLE_API_KEY } = config;
      const part = 'snippet';
      const maxResults = 50;
      const query = `https://www.googleapis.com/youtube/v3/videos?key=${YT_CONSOLE_API_KEY}&part=${part}&id=${videoId}&maxResults=${maxResults}`;

      const response = await axios.get(query);
      const firstItem = response.data.items[0];
      firstItem.snippet.resourceId = { videoId: firstItem.id };

      const videoInfo = {
        type: 'video',
        data: firstItem
      };

      res.status(200).json(videoInfo);
      // res.status(200).json(videoInfo);
    } catch (e) {
      next(e);
    }
  },

  async getPlaylistPage(req, res, next) {
    try {
      const { videoNumber, nextPageToken, prevPageToken } = req.body;
      const queryData = {
        apiKey: config.YT_CONSOLE_API_KEY,
        part: 'snippet',
        playlistId: req.body.playlistId,
        maxResults: 50
      };

      const tokens = { nextPageToken, prevPageToken };

      const playlistData = await youtubeService.getPlaylistData(queryData, videoNumber, tokens);

      res.status(200).json({ playlistData, videoNumber });
    } catch (e) {
      next(e);
    }
  }
};
