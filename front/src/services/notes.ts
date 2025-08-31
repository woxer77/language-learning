import apiClient from '../configs/axios';

import { AxiosResponse } from "axios";
import { INotesElement, UserIdType } from "../ts/interfaces/types";
import { InteractionTypeEnum, NotesElementTypeEnum } from "../ts/enums/enums";

export const getExpressions = async (userId: UserIdType): Promise<AxiosResponse<INotesElement[]>> => apiClient.get(`/notes/expressions/${userId}`);
export const getWords = async (userId: UserIdType): Promise<AxiosResponse<INotesElement[]>> => apiClient.get(`/notes/words/${userId}`);

export const createWord = async (data: INotesElement): Promise<AxiosResponse<INotesElement>> => apiClient.post('/notes/word', data);
export const createExpression = async (data: INotesElement): Promise<AxiosResponse<INotesElement>> => apiClient.post('/notes/expression', data);

export const changeType = async (element: INotesElement | null, type: NotesElementTypeEnum, userId: UserIdType, notesType: InteractionTypeEnum): Promise<AxiosResponse<INotesElement>> => apiClient.put('/notes/change-type', { element, type, userId, notesType });
