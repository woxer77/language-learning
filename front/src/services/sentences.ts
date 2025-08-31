import { AxiosResponse } from "axios";

import apiClient from "../configs/axios";
import { ISentence, UserIdType } from "../ts/interfaces/types";

export const getSentences = async (userId: UserIdType, videoId: string): Promise<AxiosResponse<ISentence>> => apiClient.get(`/sentences/${userId}/${videoId}`);
export const createSentence = async (data: ISentence): Promise<AxiosResponse<ISentence>> => apiClient.post('/sentences/add-sentence', data);
