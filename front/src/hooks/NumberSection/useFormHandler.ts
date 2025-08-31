import React from "react";

import { FieldValues, useForm } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";

import { setCurrMedia, setSentences } from "../../redux/slices/currVideoSlice";
import { MAX_ITEMS_IN_PACK } from "../../configs/config";
import { GetPlaylistPageProps } from "../../services/youtube";
import { setLastVisitedVideoId } from "../../helpers/common/localStorage";
import { useAppDispatch, useAppSelector } from "../common/redux";
import { ActivateAlertProps } from "../../ts/interfaces/types";
import { AlertTypeEnum } from "../../ts/enums/enums";

export const useFormHandler = (
  mutation: UseMutationResult<any, Error, GetPlaylistPageProps, unknown>,
  activateAlert: ActivateAlertProps
) => {
  const video = useAppSelector(state => state.currVideoReducer.media);
  const allMedia = useAppSelector(state => state.mediaReducer);

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

  const [disableBtn, setDisableBtn] = React.useState(false);
  const dispatch = useAppDispatch();

  const disableArrowBtn = (ms: number) => {
    setDisableBtn(true);

    setTimeout(() => {
      setDisableBtn(false);
    }, ms);
  };

  const nextVideo = () => {
    if (disableBtn) return;

    updateVideoAndMutate(1);
  }

  const prevVideo = () => {
    if (disableBtn) return;

    updateVideoAndMutate(-1);
  }

  const onSubmit = (formData: FieldValues) => {
    const itemPosition = Number(formData.videoNumber) - 1;

    const currPosition = video.position;

    if (itemPosition === currPosition || itemPosition < 0) return;
    if (itemPosition >= allMedia.videoCount) {
      activateAlert('The entered video number is greater than the total number of videos in the playlist', AlertTypeEnum.Warning, 3500);
      return;
    }

    const lastItemPosition = allMedia.items[MAX_ITEMS_IN_PACK - 1]?.position
      || allMedia.items[(allMedia.videoCount - 1) % MAX_ITEMS_IN_PACK].position;
    // have a pack
    if (itemPosition >= allMedia.items[0].position && itemPosition <= lastItemPosition) {
      const currVideo = allMedia.items[(itemPosition) % MAX_ITEMS_IN_PACK];

      dispatch(setCurrMedia(currVideo));
      setLastVisitedVideoId(video.playlistId, { playlistId: currVideo.playlistId, videoId: currVideo.videoId });
    } else { // get a new pack
      const queryPlaylistData = {
        playlistId: video.playlistId,
        itemPosition,
        nextPageToken: itemPosition > currPosition ? allMedia.nextPageToken : '',
        prevPageToken: itemPosition < currPosition ? allMedia.prevPageToken : '',
      }

      mutation.mutate(queryPlaylistData);
    }
  };

  const updateVideoAndMutate = (delta: number) => {
    const currPosition = video.position;

    if (currPosition + delta < 0 || currPosition + delta >= allMedia.videoCount) return;

    const isLastElementLeftSide = currPosition % MAX_ITEMS_IN_PACK === 0 && delta < 0;
    const isLastElementRightSide = currPosition % MAX_ITEMS_IN_PACK === MAX_ITEMS_IN_PACK - 1 && delta > 0;

    if (isLastElementLeftSide || isLastElementRightSide) { // get a new pack
      const queryPlaylistData = {
        playlistId: video.playlistId,
        itemPosition: currPosition + delta,
        nextPageToken: isLastElementRightSide ? allMedia.nextPageToken : '',
        prevPageToken: isLastElementLeftSide ? allMedia.prevPageToken : '',
      }

      mutation.mutate(queryPlaylistData);
    } else { // have a pack
      const currVideo = allMedia.items[(currPosition + delta) % MAX_ITEMS_IN_PACK];

      dispatch(setCurrMedia(currVideo));
      dispatch(setSentences([]));
      setLastVisitedVideoId(video.playlistId, { playlistId: currVideo.playlistId, videoId: currVideo.videoId });
    }

    setValue('videoNumber', currPosition + delta + 1);
    disableArrowBtn(1500);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    updateVideoAndMutate,
    errors,
    control,
    setValue,
    disableBtn,
    disableArrowBtn,
    nextVideo,
    prevVideo,
    video
  };
};
