import { useMutation } from "@tanstack/react-query";

import { getLastVisitedVideo, setLastVisitedVideoId } from "../../helpers/common/localStorage";
import { getPlaylistData } from "../../services/youtube";

import { setAllMedia } from "../../redux/slices/mediaSlice";
import { setCurrMedia } from "../../redux/slices/currVideoSlice";
import { IPlaylistMediaData, MutationProps } from "../../ts/interfaces/types";

const useMutationPlaylist = ({ dispatch, navigate }: MutationProps) => {
  return useMutation({
    mutationKey: ['getPlaylistData'],
    mutationFn: (id: string) => getPlaylistData(id, getLastVisitedVideo(id)?.videoId),
    onSuccess: (res) => {
      const mediaData: IPlaylistMediaData = res.data;

      const lastVideoId = getLastVisitedVideo(mediaData.playlistId)?.videoId;
      const lastVideo = mediaData.items.find((item) => item.videoId === lastVideoId) || mediaData.items[0];

      setLastVisitedVideoId(lastVideo.playlistId, {playlistId: lastVideo.playlistId, videoId: lastVideo.videoId});

      dispatch(setCurrMedia(lastVideo));
      dispatch(setAllMedia(mediaData));

      navigate(`/`);
    },
    onError: (err) => {
      console.log(err);
    }
  });
};

export { useMutationPlaylist };
