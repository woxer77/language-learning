import React from 'react';

import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';

import styles from './YTVideo.module.scss';

interface YTVideoProps {
  videoId: string;
}

const YTVideo: React.FC<YTVideoProps> = ({ videoId }) => {
  const [player, setPlayer] = React.useState<YouTubePlayer>(null);
  const [keysPressed, setKeysPressed] = React.useState<string[]>([]);
  const SECONDS_SKIP_FOR = 3;

  const videoOptions = {
    playerVars: {
      iv_load_policy: 3, // annotation | 1 - enable , 3 - disable
      rel: 0 // proposed videos after end of the video | 1 - enable , 0 - disable
    }
  };

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prevKeys) => {
        let updatedKeys = prevKeys;
        if (!prevKeys.includes(event.key)) updatedKeys = [...prevKeys, event.key];

        if (player !== null) {
          if (updatedKeys.includes('Control') && updatedKeys.includes('ArrowRight')) {
            event.preventDefault();
            player.seekTo(player.getCurrentTime() + SECONDS_SKIP_FOR);
          }
          if (updatedKeys.includes('Control') && updatedKeys.includes('ArrowLeft')) {
            event.preventDefault();
            player.seekTo(player.getCurrentTime() - SECONDS_SKIP_FOR);
          }
          if (updatedKeys.includes('Control') && updatedKeys.includes(' ')) {
            event.preventDefault();

            if (player.getPlayerState() === 1) {
              player.pauseVideo();
            } else if (player.getPlayerState() === 2) {
              player.playVideo();
            }
          }
        }

        return updatedKeys;
      });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed((prevKeys) => prevKeys.filter((key) => key !== event.key));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [player, keysPressed]);

  return (
    <div className={styles.videoResponsive}>
      <YouTube videoId={videoId} onReady={onReady} opts={videoOptions} />
    </div>
  );
};

export default React.memo(YTVideo);
