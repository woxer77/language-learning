import { AxiosResponse } from "axios";

import apiClient from "../configs/axios";
import { SetHistoryProps } from "../hooks/EnterLink/useMutationHistory";

export const setHistory = async (data: SetHistoryProps): Promise<AxiosResponse<string[]>> => apiClient.post('/user/set-history', data);
