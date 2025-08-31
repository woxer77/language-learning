import React from "react";

export const openDialog = (selection: Selection | null, dialogRef: React.RefObject<HTMLDivElement>) => {
  if (!dialogRef?.current || !selection) return;

  const { left, top } = selection.getRangeAt(0).getBoundingClientRect(); // get pos of selected text
  const { height: dialogHeight } = dialogRef.current.getBoundingClientRect();
  const SELECTION_PADDING = 6;

  dialogRef.current.style.top = `${top + window.pageYOffset - dialogHeight - SELECTION_PADDING}px`;
  dialogRef.current.style.left = `${left}px`;

  // console.log(selection.getRangeAt(0));

  /*if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');

    span.style.backgroundColor = 'wheat';

    range.surroundContents(span);
  }*/
};
