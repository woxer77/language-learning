import { useMutation } from "@tanstack/react-query";
import { getVideoData } from "../../services/youtube";
import { setAllMedia } from "../../redux/slices/mediaSlice";
import { setCurrMedia } from "../../redux/slices/currVideoSlice";
import { IPlaylistMediaData, MutationProps } from "../../ts/interfaces/types";

const useMutationVideo = ({ dispatch, navigate }: MutationProps) => {
  return useMutation({
    mutationKey: ['getVideoData'],
    mutationFn: (id: string) => getVideoData(id),
    onSuccess: (res) => {
      const mediaData: IPlaylistMediaData = res.data;
      const video = mediaData.items[0];

      dispatch(setAllMedia(mediaData));
      dispatch(setCurrMedia(video));

      navigate(`/`);
    },
    onError: (err) => {
      console.log(err);
    }
  });
};

export { useMutationVideo };
