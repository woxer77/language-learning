import { AxiosResponse } from "axios";

import apiClient from "../configs/axios";
import { IPlaylistMediaData } from "../ts/interfaces/types";

interface GetPlaylistPageResponse {
  playlistData: IPlaylistMediaData;
  itemPosition: number;
}

export interface GetPlaylistPageProps {
  itemPosition: number;
  nextPageToken: string;
  prevPageToken: string;
}

export const getPlaylistData = async (playlistId: string, videoId?: string | undefined): Promise<AxiosResponse<IPlaylistMediaData>> => {
  if (videoId) {
    return apiClient.get(`/youtube/playlist/${playlistId}/${videoId}`);
  } else {
    return apiClient.get(`/youtube/playlist/${playlistId}`);
  }
};
export const getPlaylistsHistory = async (history: string[], lastVisitedVideos: string[]): Promise<AxiosResponse<IPlaylistMediaData[]>> => apiClient.post('/youtube/playlist/get-history', { history, lastVisitedVideos });

export const getVideoData = async (videoId: string): Promise<AxiosResponse<IPlaylistMediaData>> => apiClient.get(`/youtube/video/${videoId}`);
export const getPlaylistPage = async (data: GetPlaylistPageProps): Promise<AxiosResponse<GetPlaylistPageResponse>> => apiClient.post('/youtube/playlist/get-page', data);
