import React, { ComponentProps } from 'react';

import HomeSvgSelector from "../../../assets/images/icons/home/HomeSvgSelector";

import { NotesBtnDirectionEnum } from "../../../ts/enums/enums";

import styles from './NotesButton.module.scss';

type NotesButtonProps = ComponentProps<"button"> & {
  direction: NotesBtnDirectionEnum;
};

const NotesButton: React.FC<NotesButtonProps> = ({ onClick, direction }) => {
  const iconId = direction === NotesBtnDirectionEnum.Left ? 'notesArrowLeft' : 'notesArrowRight';
  const id = direction === NotesBtnDirectionEnum.Left ? styles.left : styles.right;

  return (
    <button className={styles.slide} type="button" id={id} onClick={onClick}>
      {direction === NotesBtnDirectionEnum.Left &&
        <HomeSvgSelector iconId={iconId}/>
      }
      <p className={styles.text}>{direction}</p>
      {direction === NotesBtnDirectionEnum.Right &&
        <HomeSvgSelector iconId={iconId}/>
      }
    </button>
  );
};

export default NotesButton;
