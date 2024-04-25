const axios = require('axios');

const fetchPlaylistData = async (queryData, videoNumber, pageToken) => {
  const { apiKey, part, playlistId, maxResults } = queryData;
  const query = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&part=${part}&playlistId=${playlistId}&maxResults=${maxResults}&pageToken=${pageToken}`;
  const response = await axios.get(query);

  return {
    type: 'playlist',
    data: response.data,
    startIndex: videoNumber % maxResults
  };
};

module.exports = { fetchPlaylistData };
