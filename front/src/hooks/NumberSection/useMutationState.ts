import { useMutation } from '@tanstack/react-query';

import { getPlaylistPage, GetPlaylistPageProps } from '../../services/youtube';
import { setCurrMedia } from "../../redux/slices/currVideoSlice";
import { setAllMedia } from "../../redux/slices/mediaSlice";
import { MAX_ITEMS_IN_PACK } from "../../configs/config";
import { ActivateAlertProps } from "../../ts/interfaces/types";
import { AlertTypeEnum } from "../../ts/enums/enums";
import { setLastVisitedVideoId } from "../../helpers/common/localStorage";
import { useAppDispatch, useAppSelector } from "../common/redux";

export const useMutationState = (activateAlert: ActivateAlertProps) => {
  const video = useAppSelector(state => state.currVideoReducer.media);

  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationKey: ['getPlaylistPage', video.playlistId],
    mutationFn: (data: GetPlaylistPageProps) => getPlaylistPage(data),
    onSuccess(res) {
      const { playlistData, itemPosition } = res.data;
      const resVideo = playlistData.items[itemPosition % MAX_ITEMS_IN_PACK];

      dispatch(setAllMedia(playlistData));
      dispatch(setCurrMedia(resVideo));

      setLastVisitedVideoId(resVideo.playlistId, { playlistId: resVideo.playlistId, videoId: resVideo.videoId });
    },
    onError(error) {
      activateAlert(error.message, AlertTypeEnum.Error, 2500);
      console.log(error);
    }
  });

  return { mutation };
};
