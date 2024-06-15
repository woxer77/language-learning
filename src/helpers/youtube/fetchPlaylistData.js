const axios = require('axios');

const fetchPlaylistData = async (queryData, pageToken) => {
  const { apiKey, part, playlistId, maxResults } = queryData;
  const query = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&part=${part}&playlistId=${playlistId}&maxResults=${maxResults}&pageToken=${pageToken}`;

  const response = await axios.get(query);

  const items = response.data.items.map((elem) => ({
    title: elem.snippet.title,
    channelTitle: elem.snippet.channelTitle,
    publishedAt: elem.snippet.publishedAt,
    thumbnails: {
      default: elem.snippet.thumbnails.default,
      medium: elem.snippet.thumbnails.medium,
      high: elem.snippet.thumbnails.high,
      standard: elem.snippet.thumbnails.standard,
      maxres: elem.snippet.thumbnails.maxres
    },
    playlistId: elem.snippet.playlistId,
    videoId: elem.snippet.resourceId.videoId,
    position: elem.snippet.position,
  }));
  const mediaData = {
    items: [...items],
    nextPageToken: response.data.nextPageToken,
    prevPageToken: response.data?.prevPageToken,
    videoCount: response.data.pageInfo.totalResults,
    playlistId: items[0].playlistId,
  };

  return mediaData;
};

module.exports = { fetchPlaylistData };
