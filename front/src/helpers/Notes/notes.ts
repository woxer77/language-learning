import React from "react";

import { INotesElement } from "../../ts/interfaces/types";
import { MAX_NOTES_ROW_HEIGHT, MAX_ROWS_PER_PAGE } from "../../configs/config";

import styles from "../../components/elements/Notes/Notes.module.scss";

export const getDataForCurrPage = (currData: INotesElement[], currPage: number) => currData.filter((elem, idx) => {
  if (idx >= (currPage - 1) * MAX_ROWS_PER_PAGE
    && idx < ((currPage - 1) * MAX_ROWS_PER_PAGE) + MAX_ROWS_PER_PAGE) {
    return elem;
  }
  return null;
});

export const resizeWords = (mainContainer: React.RefObject<HTMLDivElement>) => {
  if (!mainContainer.current) return;

  const notesRowsText = mainContainer.current.querySelectorAll<HTMLElement>(`.${styles.text}`);
  const notesRows = mainContainer.current.querySelectorAll<HTMLElement>(`.${styles.row}`);

  notesRowsText.forEach((elem, idx) => {
    let oldFontSize = parseFloat(getComputedStyle(elem).fontSize);
    while (elem.getBoundingClientRect().height > MAX_NOTES_ROW_HEIGHT) {
      oldFontSize -= 0.5;
      elem.style.fontSize = `${oldFontSize}px`;
    }
    while (elem.getBoundingClientRect().height < MAX_NOTES_ROW_HEIGHT &&
    elem.getBoundingClientRect().width < notesRows[idx].getBoundingClientRect().width - 100) {
      oldFontSize += 0.5;
      elem.style.fontSize = `${oldFontSize}px`;
    }
  });
};
