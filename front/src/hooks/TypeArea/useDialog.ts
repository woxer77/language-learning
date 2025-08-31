import React, { MouseEventHandler } from "react";

import { openDialog } from "../../helpers/NotesDialog/notesDialog";

export interface NotesDialogHook {
  handleSelectText: MouseEventHandler<HTMLDivElement>;
  closeDialog: () => void;
  selectionElement: Selection | null;
  dialogRef: React.RefObject<HTMLDivElement>;
  sentencesRef: React.RefObject<HTMLDivElement>;
}

const useDialog = (): NotesDialogHook => {
  const [selectionElement, setSelectionElement] = React.useState<Selection | null>(null);

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const sentencesRef = React.useRef<HTMLDivElement>(null);

  const handleSelectText: MouseEventHandler<HTMLDivElement> = () => {
    const selection = window.getSelection();
    if (!selection) return;

    const selectedString = selection.toString().trim();

    if (selectedString.includes('\n') || !selectedString) return;

    setSelectionElement(selection);

    if (selectedString.length > 0) {
      openDialog(selection, dialogRef);
    }
  };

  const closeDialog = () => {
    setSelectionElement(null);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((dialogRef.current && !dialogRef.current.contains(event.target as Node))) {
        closeDialog();
      }
    };

    const handleScroll = () => {
      if (dialogRef.current) {
        closeDialog();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll);

    if (sentencesRef.current) {
      sentencesRef.current.addEventListener('scroll', handleScroll);
      sentencesRef.current.addEventListener('mousedown', handleClickOutside);
    }

    // Event listener cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);

      if (sentencesRef.current) {
        sentencesRef.current.removeEventListener('scroll', handleScroll);
        sentencesRef.current.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, []);

  return {
    handleSelectText,
    closeDialog,
    selectionElement,
    dialogRef,
    sentencesRef
  };
};

export default useDialog;
