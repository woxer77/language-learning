import { MAX_ROWS_PER_PAGE } from "../../configs/config";
import { INotesElement } from "../../ts/interfaces/types";
import React from "react";

export const usePage = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  elemsForCurrType: INotesElement[]
) => {
  const getPagesCount = () => {
    return Math.ceil(elemsForCurrType.length / MAX_ROWS_PER_PAGE) || 1;
  };

  const changePage = (delta: number) => {
    const newPageNumber = currentPage + delta;
    let pageToGo = newPageNumber;
    const currentPagesCount = getPagesCount();

    if (newPageNumber < 1) pageToGo = currentPagesCount;
    else if (newPageNumber > currentPagesCount) pageToGo = 1;

    setCurrentPage(pageToGo);
  };

  const prevPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return { getPagesCount, prevPage, nextPage };
};
