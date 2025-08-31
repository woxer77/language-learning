import { AlertTypeEnum, NotesElementTypeEnum } from "../enums/enums";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { CSSProperties } from "react";

// User related types
export interface IUser {
  email: string;
  password: string;
}

export type UserIdType = number | null;

// Alert related types
export interface IAlert {
  isActive: boolean;
  message: string;
  type: AlertTypeEnum;
}

export type ActivateAlertProps = (message: string, type: AlertTypeEnum, ms: number) => void;

// Notes related types
export interface INotesElement {
  initialText: string;
  translatedText: string;
  type: NotesElementTypeEnum;
  userId: UserIdType;
  time?: string;
}

// Sentence related types
export interface ISentence {
  videoId: string;
  sentence: string;
  number: number;
  userId: UserIdType;
}

// Media related types
interface IMediaThumbnails {
  url: string;
  width: number;
  height: number;
}

export interface IMediaDataItem {
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: {
    'default': IMediaThumbnails;
    'medium': IMediaThumbnails;
    'high': IMediaThumbnails;
    'standard': IMediaThumbnails;
    'maxres': IMediaThumbnails;
  };
  playlistId: string;
  videoId: string;
  position: number;
}

export interface IPlaylistMediaData {
  items: IMediaDataItem[];
  nextPageToken: string;
  prevPageToken: string;
  videoCount: number;
  playlistId: string;
}

// SVG related types
export interface SvgSelector {
  iconId: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

// EnterLink related types
export interface MutationProps {
  dispatch: Dispatch;
  navigate: NavigateFunction;
}
