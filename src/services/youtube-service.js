const { fetchPlaylistData } = require("../helpers/youtube/fetchPlaylistData");
const { MAX_ITEMS_IN_PACK } = require("../configs/config");

module.exports = {
  async getPlaylistData(queryData, itemPosition, tokens) {
    const { nextPageToken, prevPageToken } = tokens;

    const direction = nextPageToken ? 'next' : 'prev';
    const initialPageToken = nextPageToken || prevPageToken;

    let playlistData = await fetchPlaylistData(queryData, initialPageToken);

    if (direction === 'next') {
      while ((playlistData.items[queryData.maxResults - 1]?.position ||
      playlistData.items[(playlistData.videoCount - 1) % MAX_ITEMS_IN_PACK].position) < itemPosition) {
        playlistData = await fetchPlaylistData(queryData, playlistData.nextPageToken);
      }
    } else {
      while (playlistData.items[0].position > itemPosition) {
        playlistData = await fetchPlaylistData(queryData, playlistData.prevPageToken);
      }
    }

    return playlistData;
  }
};
