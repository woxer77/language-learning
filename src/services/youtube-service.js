const { fetchPlaylistData } = require("../helpers/fetchPlaylistData");

module.exports = {
  async getPlaylistData(queryData, videoNumber, tokens) {
    const { nextPageToken, prevPageToken } = tokens;

    const direction = nextPageToken ? 'next' : 'prev';
    const initialPageToken = nextPageToken || prevPageToken;

    let playlistData = await fetchPlaylistData(queryData, videoNumber, initialPageToken);

    if (direction === 'next') {
      while (playlistData.data.items[queryData.maxResults - 1].snippet.position < videoNumber) {
        playlistData = await fetchPlaylistData(queryData, videoNumber, playlistData.data.nextPageToken);
      }
    } else {
      while (playlistData.data.items[0].snippet.position > videoNumber) {
        playlistData = await fetchPlaylistData(queryData, videoNumber, playlistData.data.prevPageToken);
      }
    }

    return playlistData;
  }
};
