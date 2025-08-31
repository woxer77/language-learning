const { fetchPlaylistData } = require("../../helpers/youtube/fetchPlaylistData");

const getPlaylistsHistory = async (history, lastVisitedVideos, queryData) => {
  const playlistsHistory = [];

  for (let i = 0; i < history.length; i++) {
    queryData.playlistId = history[i];

    let mediaData = await fetchPlaylistData(queryData, '');

    if (lastVisitedVideos[i]) {
      let foundVideoPosition = mediaData.items.find((elem) => elem.videoId === lastVisitedVideos[i])?.position;

      while (foundVideoPosition === undefined) {
        mediaData = await fetchPlaylistData(queryData, mediaData.nextPageToken);
        foundVideoPosition = mediaData.items.find((elem) => elem.videoId === lastVisitedVideos[i])?.position;
      }
    }

    playlistsHistory.push(mediaData);
  }

  return playlistsHistory;
}

module.exports = { getPlaylistsHistory };
