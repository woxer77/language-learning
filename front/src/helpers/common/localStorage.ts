interface LastVisitedVideoItem {
  playlistId: string;
  videoId: string;
}

const getStorageArr = () => {
  const storageStr = localStorage.getItem('lastVisitedVideos');
  return storageStr ? JSON.parse(storageStr) : [];
};

const getLastVisitedVideo = (playlistId: string): LastVisitedVideoItem => {
  const storageArr = getStorageArr();

  return storageArr.find((item: LastVisitedVideoItem) => item.playlistId === playlistId);
};

const setLastVisitedVideoId = (playlistId: string, data: LastVisitedVideoItem) => {
  const storageArr = getStorageArr();
  const newArr = storageArr.map((item: LastVisitedVideoItem) => item.playlistId === playlistId ? data : item);

  if (!getLastVisitedVideo(playlistId)?.videoId) newArr.push(data);

  localStorage.setItem('lastVisitedVideos', JSON.stringify(newArr));
};

export { getLastVisitedVideo, setLastVisitedVideoId };
