import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { URL } from "../../configs/config";
import apiClient from "../../configs/axios";
import { IUser, UserIdType } from "../../ts/interfaces/types";

interface UserState {
  userId: UserIdType;
  isAuth: boolean;
  history: string[];
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

const initialState: UserState = {
  userId: null,
  isAuth: false,
  history: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUserId: (state, action: PayloadAction<UserIdType>) => {
      state.userId = action.payload;
    },
    setHistory: (state, action: PayloadAction<string[]>) => {
      state.history = action.payload;
    },
    resetAll: () => initialState
  }
});

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await apiClient.get<RefreshResponse>(`${URL}/auth/refresh`, { withCredentials: true });
      const { accessToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);

      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const {
  setAuth, setUserId, resetAll, setHistory
} = userSlice.actions;

export default userSlice.reducer;
