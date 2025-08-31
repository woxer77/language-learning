import React, { CSSProperties } from 'react';

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import EnterLinkSvgSelector
  from '../../../assets/images/icons/enter-link/EnterLinkSvgSelector';
import Dialog from '../../UI/Dialog/Dialog';
import HistoryPlaylist from '../HistoryPlaylist/HistoryPlaylist';
import HistorySkeleton from '../HistorySkeleton/HistorySkeleton';

import { IPlaylistMediaData } from '../../../ts/interfaces/types';
import { useAppDispatch } from '../../../hooks/common/redux';
import { getLastVisitedVideo } from '../../../helpers/common/localStorage';
import { getPlaylistsHistory } from '../../../services/youtube';
import { setCurrMedia } from '../../../redux/slices/currVideoSlice';
import { setAllMedia } from '../../../redux/slices/mediaSlice';
import { setHistory } from '../../../redux/slices/userSlice';

import styles from './HistoryDialog.module.scss';

interface HistoryDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  history: string[];
}

const HistoryDialog: React.FC<HistoryDialogProps> = ({ isDialogOpen, setIsDialogOpen, history }) => {
  const lastVisitedVideos = history?.map((link) => getLastVisitedVideo(link)?.videoId);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['getPlaylistsHistory', history, lastVisitedVideos],
    queryFn: () => getPlaylistsHistory(history, lastVisitedVideos),
    enabled: history?.length > 0 && lastVisitedVideos?.length > 0 && isDialogOpen,
    refetchOnWindowFocus: false,
  });
  const historyData: IPlaylistMediaData[] = data?.data as IPlaylistMediaData[] | [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const opacityStyle: CSSProperties = {
    opacity: isDialogOpen ? 1 : 0,
    visibility: isDialogOpen ? 'visible' : 'hidden'
  };
  const dialogStyle: CSSProperties = {
    ...opacityStyle,
    transform: isDialogOpen ? "translate(-50%, -50%)" : "translate(-50%, 0)"
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const selectPlaylist = (idx: number, videoIdx: number) => {
    const playlist = historyData[idx];
    const video = playlist.items[videoIdx];

    // Move selected playlist to the top of the list
    const removedLinkIdx = history.findIndex((link) => link === playlist.playlistId);
    const updLastVisitedPlaylists = history.slice();

    updLastVisitedPlaylists.splice(removedLinkIdx, 1);
    updLastVisitedPlaylists.unshift(playlist.playlistId);

    dispatch(setCurrMedia(video));
    dispatch(setAllMedia(playlist));
    dispatch(setHistory(updLastVisitedPlaylists));

    navigate(`/`);
  };

  return (
    <>
      <div className={styles.transparentBg} style={opacityStyle}/>
      <Dialog className={styles.dialog} style={dialogStyle}>
        <div className={styles.header}>
          <p className={styles.title}>Last visited playlists history</p>
          <div className={styles.close} onClick={closeDialog}>
            <EnterLinkSvgSelector iconId="close"/>
          </div>
        </div>
        <div className="divider"/>
        <div className={styles.playlists}>
          {(isLoading || isError) &&
            new Array(history.length).fill(<HistorySkeleton/>).map((skeleton, idx) => (
              <div key={`skeleton-${idx}`}>{skeleton}</div>
            ))}
          {historyData?.map((playlist: IPlaylistMediaData, idx) => (
            <div key={playlist.playlistId}>
              <HistoryPlaylist
                playlist={playlist}
                idx={idx}
                lastVisitedVideos={lastVisitedVideos}
                selectPlaylist={selectPlaylist}
              />
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default React.memo(HistoryDialog);
