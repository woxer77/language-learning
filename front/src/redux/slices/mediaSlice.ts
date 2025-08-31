import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlaylistMediaData } from "../../ts/interfaces/types";

const initialState: IPlaylistMediaData = {
  items: [],
  nextPageToken: '',
  prevPageToken: '',
  videoCount: 0,
  playlistId: ''
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setAllMedia: (state, action: PayloadAction<IPlaylistMediaData>) => {
      state.items = action.payload.items;
      state.nextPageToken = action.payload.nextPageToken;
      state.prevPageToken = action.payload.prevPageToken;
      state.videoCount = action.payload.videoCount;
      state.playlistId = action.payload.playlistId;
    },
    resetAll: () => initialState,
  }
});

export const {
  setAllMedia, resetAll
} = mediaSlice.actions;

export default mediaSlice.reducer;
