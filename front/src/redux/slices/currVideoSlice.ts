import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMediaDataItem, INotesElement, ISentence } from "../../ts/interfaces/types";

interface CurrVideoState { // TODO перенести words, expressions в userSLice
  words: INotesElement[];
  expressions: INotesElement[];
  sentences: ISentence[];
  media: IMediaDataItem;
}

const initialState: CurrVideoState = {
  words: [],
  expressions: [],
  sentences: [],
  media: {} as IMediaDataItem,
};

const currVideoSlice = createSlice({
  name: 'currVideo',
  initialState,
  reducers: {
    setExpressions: (state, action: PayloadAction<INotesElement[]>) => {
      state.expressions = action.payload;
    },
    addExpression: (state, action: PayloadAction<INotesElement>) => {
      state.expressions.unshift(action.payload);
    },
    setWords: (state, action: PayloadAction<INotesElement[]>) => {
      state.words = action.payload;
    },
    addWord: (state, action: PayloadAction<INotesElement>) => {
      state.words.unshift(action.payload);
    },
    setSentences: (state, action: PayloadAction<ISentence[]>) => {
      state.sentences = action.payload;
    },
    addSentence: (state, action: PayloadAction<ISentence>) => {
      state.sentences.push(action.payload);
    },
    setCurrMedia(state, action: PayloadAction<IMediaDataItem>) {
      state.media = action.payload;
    },
    resetAll: () => initialState,
  }
});

export const {
  setExpressions, addExpression, setWords, addWord, setSentences, addSentence, setCurrMedia, resetAll
} = currVideoSlice.actions;

export default currVideoSlice.reducer;
