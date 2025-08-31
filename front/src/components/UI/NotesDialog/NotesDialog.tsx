import React, { CSSProperties } from 'react';

import { useMutation } from "@tanstack/react-query";

import HomeSvgSelector from "../../../assets/images/icons/home/HomeSvgSelector";

import { InteractionTypeEnum, NotesElementTypeEnum } from "../../../ts/enums/enums";
import { INotesElement } from "../../../ts/interfaces/types";
import { addExpression, addWord } from "../../../redux/slices/currVideoSlice";
import { createWord, createExpression } from "../../../services/notes";
import { useAppDispatch, useAppSelector } from "../../../hooks/common/redux";

import styles from './NotesDialog.module.scss';

export interface NotesDialogProps {
  selectionElement: Selection | null;
  closeDialog: () => void;
  ref: React.LegacyRef<HTMLDivElement>;
}

const NotesDialog: React.FC<NotesDialogProps> = React.forwardRef(({
    selectionElement, closeDialog
  }, ref) => {
  const userId = useAppSelector(state => state.userReducer.userId);
  const [interactionType, setInteractionType] = React.useState<InteractionTypeEnum>(InteractionTypeEnum.Word);

  const mutationWord = useMutation({
    mutationKey: ['createWord', userId],
    mutationFn: (data: INotesElement) => createWord(data),
    onSuccess: (res) => {
      const newWord = res.data;

      dispatch(addWord(newWord));
    }
  });

  const mutationExpression = useMutation({
    mutationKey: ['createExpression', userId],
    mutationFn: (data: INotesElement) => createExpression(data),
    onSuccess: (res) => {
      const newExpression = res.data;

      dispatch(addExpression(newExpression));
    }
  });

  const dialogStyles: CSSProperties = {
    opacity: selectionElement ? 1 : 0,
    visibility: selectionElement ? 'visible' : 'hidden'
  };

  const dispatch = useAppDispatch();

  const handleSelectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value) return;

    setInteractionType(event.target.value as InteractionTypeEnum);
  };

  const addElementToNotes = (type: NotesElementTypeEnum) => {
    if (!selectionElement || !selectionElement.toString()) return;

    const newElement = {
      initialText: selectionElement.toString().trim(),
      translatedText: 'unknown',
      type,
      userId,
    };

    if (interactionType === InteractionTypeEnum.Expression) {
      mutationExpression.mutate(newElement);
    } else if (interactionType === InteractionTypeEnum.Word) {
      mutationWord.mutate(newElement);
    }

    closeDialog();
  };

  return (
    <div className={styles.dialog} ref={ref} style={dialogStyles}>
      <div className={styles.title}>
        <p className={styles.text}>Add to </p>
        <select className={styles.select} value={interactionType} onChange={handleSelectType}>
          <option value={InteractionTypeEnum.Word}>words</option>
          <option value={InteractionTypeEnum.Expression}>expressions</option>
        </select>
      </div>
      <span className={styles.verticLine}/>
      <div className={styles.buttons}>
        <button type="button" className={styles.btn} onClick={() => addElementToNotes(NotesElementTypeEnum.Weak)}>
          <HomeSvgSelector iconId="bookWeak" id={styles.svgWeak}/>
        </button>
        <span className={styles.horizLine} />
        <button
          type="button"
          className={styles.btn}
          onClick={() => addElementToNotes(NotesElementTypeEnum.Medium)}
        >
          <HomeSvgSelector iconId="bookMedium" id={styles.svgMedium}/>
        </button>
        <span className={styles.horizLine}/>
        <button
          type="button"
          className={styles.btn}
          onClick={() => addElementToNotes(NotesElementTypeEnum.Strong)}
        >
          <HomeSvgSelector iconId="bookStrong" id={styles.svgStrong}/>
        </button>
      </div>
    </div>
  );
});

export default NotesDialog;
