import React, { CSSProperties, MouseEventHandler } from 'react';

import { INotesElement } from "../../../ts/interfaces/types";
import { NotesElementTypeEnum } from "../../../ts/enums/enums";
import { GREEN_COLOR, ORANGE_COLOR, RED_COLOR } from "../../../configs/config";
import { useAppSelector } from "../../../hooks/common/redux";

import styles from './Sentences.module.scss';

export interface SentencesProps {
  sentencesRef: React.LegacyRef<HTMLDivElement>;
  handleSelectText: MouseEventHandler<HTMLDivElement>;
  isNumsShown: boolean;
  alphabetMap: Map<string, object[]> | undefined;
  divForScrollRef: React.LegacyRef<HTMLDivElement>;
}

const Sentences: React.FC<SentencesProps> = ({
    sentencesRef,
    handleSelectText,
    isNumsShown,
    alphabetMap,
    divForScrollRef
  }) => {

  const sentences = useAppSelector(state => state.currVideoReducer.sentences);

  const wordInNotesStyles = (type: NotesElementTypeEnum): CSSProperties => ({
    color: type === NotesElementTypeEnum.Weak ? RED_COLOR : type === NotesElementTypeEnum.Medium ? ORANGE_COLOR : GREEN_COLOR,
    fontWeight: 'bold'
  });
  const transformWordElements = (word: string, idx: number, array: string[]) => {
    if (!alphabetMap) return;

    const isLastElement = idx === array.length - 1;
    const wordElement = `${word}${isLastElement ? '' : ' '}`;
    if (alphabetMap.size === 0) return wordElement;
    const firstLetter = word[0].toLowerCase() || word.toLowerCase();
    const letterArr = alphabetMap.get(firstLetter) || [];
    const match = letterArr.find((item: object) => (item as INotesElement).initialText === word) as INotesElement;

    return (
      <span key={idx} style={match ? wordInNotesStyles(match.type) : undefined}>
        {wordElement}
      </span>
    );
  };
  // TODO: IMPORTANT! Look at the code of hashMap. Sentences now lags.
  return (
    <div className={styles.sentences} ref={sentencesRef} onMouseUp={handleSelectText}>
      {sentences.map((sentence) => (
        <div key={sentence.number}>
          <div className={`${styles.sentence} ${styles.slideInFromLeft}`}>
            {isNumsShown && <p className="number">{`${sentence.number}.`}</p>}
            <p className={styles.text}>
              {sentence.sentence?.split(' ').map(transformWordElements)}
            </p>
          </div>
        </div>
      ))}
      <div ref={divForScrollRef}/>
    </div>
  );
};

export default Sentences;
