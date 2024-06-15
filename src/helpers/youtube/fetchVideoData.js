const axios = require('axios');

const fetchVideoData = async (queryData) => {
  const { apiKey, part, videoId, maxResults } = queryData;
  const query = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=${part}&id=${videoId}&maxResults=${maxResults}`;

  const response = await axios.get(query);
  const video = response.data.items[0];

  const videoItem = {
    title: video.snippet.title,
    publishedAt: video.snippet.publishedAt,
    thumbnails: {
      default: video.snippet.thumbnails.default,
      medium: video.snippet.thumbnails.medium,
      high: video.snippet.thumbnails.high,
      standard: video.snippet.thumbnails.standard,
      maxres: video.snippet.thumbnails.maxres
    },
    videoId: video.id,
    playlistId: '',
    position: 0,
  };
  const mediaData = {
    items: [videoItem],
    nextPageToken: '',
    prevPageToken: '',
    videoCount: 1,
    playlistId: '',
  }; // TODO: think about refactoring playlistInfo data

  return mediaData;
};

module.exports = { fetchVideoData };
