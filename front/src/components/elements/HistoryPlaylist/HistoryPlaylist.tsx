import React from 'react';

import { IPlaylistMediaData } from "../../../ts/interfaces/types";

import styles from './HistoryPlaylist.module.scss';

interface HistoryPlaylistProps {
  playlist: IPlaylistMediaData;
  idx: number;
  lastVisitedVideos: string[];
  selectPlaylist: (idx: number, videoIdx: number) => void;
}

const HistoryPlaylist: React.FC<HistoryPlaylistProps> = ({ playlist, idx, lastVisitedVideos, selectPlaylist }) => {
  let lastVisitedVideoIdx = -1;
  for (let videoId of lastVisitedVideos) {
    lastVisitedVideoIdx = playlist.items.findIndex((item) => item.videoId === videoId);
    if (lastVisitedVideoIdx !== -1) break;
  }
  const videoIdx = lastVisitedVideoIdx === -1 ? 0 : lastVisitedVideoIdx;

  return (
    <div className={styles.playlist} onClick={() => selectPlaylist(idx, videoIdx)}>
      <img src={`${playlist.items[videoIdx].thumbnails.medium.url}`} className={styles.image} alt="thumbnail"/>
      <div className={styles.information}>
        <div className={styles.title}>{playlist.items[videoIdx].title}</div>
        <div className={styles.channel}>{playlist.items[videoIdx].channelTitle}</div>
        <div className="divider" />
        <div className={styles.text}>Total video number: {playlist.videoCount}</div>
        <div className={styles.text}>Last visited video: {playlist.items[videoIdx].position + 1}</div>
      </div>
    </div>
  );
};

export default HistoryPlaylist;
