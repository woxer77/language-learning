import { AxiosResponse } from "axios";

import apiClient from "../configs/axios";
import { IUser } from "../ts/interfaces/types";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export const registration = async (user: IUser): Promise<AxiosResponse<AuthResponse>> => apiClient.post('/auth/registration', user);
export const login = async (user: IUser): Promise<AxiosResponse<AuthResponse>> => apiClient.post('/auth/login', user);
export const logout = async () => apiClient.post('/auth/logout');

