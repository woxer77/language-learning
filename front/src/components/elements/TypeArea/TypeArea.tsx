import React from 'react';

import NotesDialog from "../../UI/NotesDialog/NotesDialog";
import Field from '../../UI/Field/Field';
import SentencesContainer from "../../../containers/elements/Sentences/SentencesContainer";

import { sentenceOptions } from "../../../helpers/TypeArea/typeArea";
import useWordsMap from "../../../hooks/TypeArea/useWordsMap";
import useTypeAreaForm from "../../../hooks/TypeArea/useTypeAreaForm";
import useDialog from "../../../hooks/TypeArea/useDialog";
import { UserIdType } from "../../../ts/interfaces/types";

import styles from './TypeArea.module.scss';

interface TypeAreaProps {
  userId: UserIdType;
  videoId: string;
}

const TypeArea: React.FC<TypeAreaProps> = ({ userId, videoId }) => {
  const { alphabetMap } = useWordsMap();

  const {
    divForScrollRef,
    errors,
    handleSubmit,
    register
  } = useTypeAreaForm();

  const {
    handleSelectText,
    closeDialog,
    selectionElement,
    dialogRef,
    sentencesRef
  } = useDialog();

  const [isNumsShown, setIsNumsShown] = React.useState<boolean>(true);

  const hideNumsBtnStyles = { textDecoration: isNumsShown ? 'none' : 'line-through' };

  const numsHandler = () => {
    setIsNumsShown((prevState) => !prevState);
  };

  return (
    <>
      <button type="button" className={styles.hideNums} style={hideNumsBtnStyles} onClick={numsHandler}>Nums</button>
      <div className={styles.typeArea}>
        <NotesDialog selectionElement={selectionElement} closeDialog={closeDialog} ref={dialogRef}/>
        <SentencesContainer
          userId={userId}
          videoId={videoId}
          sentencesRef={sentencesRef}
          divForScrollRef={divForScrollRef}
          isNumsShown={isNumsShown}
          handleSelectText={handleSelectText}
          alphabetMap={alphabetMap}
        />
        <form onSubmit={handleSubmit}>
          <Field
            register={register}
            name="sentence"
            error={typeof errors?.sentence?.message === 'string' ? errors?.sentence.message : ''}
            className={styles.textField}
            options={sentenceOptions}
            placeholder="Type a sentence here..."
          />
          <button hidden />
        </form>
      </div>
    </>
  );
}

export default React.memo(TypeArea);
