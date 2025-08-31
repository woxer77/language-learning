import React from 'react';

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import NotesButton from "../../UI/NotesButton/NotesButton";
import HomeSvgSelector from '../../../assets/images/icons/home/HomeSvgSelector';

import { useAppSelector } from "../../../hooks/common/redux";

import {
  InteractionTypeEnum,
  NotesBtnDirectionEnum,
  NotesElementTypeEnum
} from "../../../ts/enums/enums";
import { INotesElement } from "../../../ts/interfaces/types";
import { NOTES_TYPE_DEFAULT_OPACITY } from "../../../configs/config";
import { getDataForCurrPage } from '../../../helpers/Notes/notes';
import { usePage } from "../../../hooks/Notes/usePage";
import { resizeWords } from '../../../helpers/Notes/notes';
import { changeType } from "../../../services/notes";
import { setExpressions, setWords } from "../../../redux/slices/currVideoSlice";

import styles from './Notes.module.scss';

export interface NotesProps {
  notesType: InteractionTypeEnum;
}

type DisplayedTexts = { [key: string]: string };

const Notes: React.FC<NotesProps> = ({ notesType }) => {
  const [currentType, setCurrentType] = React.useState<NotesElementTypeEnum>(NotesElementTypeEnum.Medium);
  const [elemsForCurrType, setElemsForCurrType] = React.useState<INotesElement[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [dragElement, setDragElement] = React.useState<INotesElement | null>(null);
  const [displayedTexts, setDisplayedTexts] = React.useState<DisplayedTexts>({});

  const levels = [{ type: NotesElementTypeEnum.Weak }, { type: NotesElementTypeEnum.Medium }, { type: NotesElementTypeEnum.Strong }];

  const mainContainer = React.useRef<HTMLDivElement>(null);
  const levelsRef = React.useRef({
    [NotesElementTypeEnum.Weak]: React.createRef<HTMLButtonElement>(),
    [NotesElementTypeEnum.Medium]: React.createRef<HTMLButtonElement>(),
    [NotesElementTypeEnum.Strong]: React.createRef<HTMLButtonElement>(),
  });

  const notesElements: INotesElement[] = useAppSelector(state => {
    if (notesType === InteractionTypeEnum.Word) return state.currVideoReducer.words;
    else if (notesType === InteractionTypeEnum.Expression) return state.currVideoReducer.expressions;
    else return [];
  });
  const userId = useAppSelector(state => state.userReducer.userId);

  const dispatch = useDispatch();

  const { getPagesCount, prevPage, nextPage } = usePage(currentPage, setCurrentPage, elemsForCurrType);

  const initializeNotesData = React.useCallback(() => {
    // TODO: IMPORTANT! MAKE HERE A TRANSLATION LOGIC
    const filteredElemsByType = notesElements.filter((e) => e.type === currentType);

    setCurrentPage(1); // reset page to 1 when changing type
    setElemsForCurrType(filteredElemsByType);
  }, [currentType, notesElements]);

  React.useEffect(() => {
    initializeNotesData();
  }, [currentType, notesElements, initializeNotesData]);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(() => resizeWords(mainContainer));
    if (mainContainer.current) {
      resizeObserver.observe(mainContainer.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [elemsForCurrType]);

  const handleDragStart = (elem: INotesElement) => {
    for (let key in levelsRef.current) {
      const refKey = key as keyof typeof levelsRef.current;

      if (refKey === currentType) continue;
      levelsRef.current[refKey].current!.style.backgroundColor = '#90CAFF';
    }
    setDragElement(elem);
  };

  const handleDragEnd = () => {
    for (let key in levelsRef.current) {
      const refKey = key as keyof typeof levelsRef.current;
      levelsRef.current[refKey].current!.style.backgroundColor = 'transparent';
    }
    setDragElement(null);
  }


  const mutation = useMutation({
    mutationKey: ['changeType', dragElement],
    mutationFn: (type: NotesElementTypeEnum) => changeType(dragElement, type, userId, notesType),
    onSuccess: (data) => {
      const updatedElement = data.data;
      console.log('successful', updatedElement);
    }
  });

  const handleOnDrop = (type: NotesElementTypeEnum) => {
    if (dragElement && type !== currentType) {
      const updNotesElements = notesElements.map((elem) => {
        if (elem.initialText === dragElement.initialText) {
          return { ...elem, type };
        }
        return elem;
      });

      if (notesType === InteractionTypeEnum.Word) {
        dispatch(setWords(updNotesElements));
      } else if (notesType === InteractionTypeEnum.Expression) {
        dispatch(setExpressions(updNotesElements));
      }

      mutation.mutate(type);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    console.log('handleDragOver');
    for (let key in levelsRef.current) {
      const refKey = key as keyof typeof levelsRef.current;

      if (refKey === currentType) continue;
      if (e.target === levelsRef.current[refKey].current) {
        levelsRef.current[refKey].current!.style.backgroundColor = '#4baaff';
      }
    }
    e.preventDefault();
  }

  /*const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    target.style.backgroundColor = 'transparent';
  };*/

  const translateText = (translatedText: string, initialText: string) => {
    setDisplayedTexts(prev => {
      if (prev[initialText] === translatedText) {
        return { ...prev, [initialText]: initialText };
      } else {
        return { ...prev, [initialText]: translatedText };
      }
    });
  };

  return (
    <div className={styles.notes}>
      <div className={styles.levels}>
        {levels.map((elem) => (
          <button
            className={styles.level}
            type="button"
            key={elem.type}
            onClick={() => setCurrentType(elem.type)}
            onDrop={() => handleOnDrop(elem.type)}
            onDragOver={handleDragOver}
            // onDragLeave={handleDragLeave}
            ref={levelsRef.current[elem.type]}
          >
            <HomeSvgSelector
              iconId={elem.type}
              style={{opacity: currentType === elem.type ? 1 : NOTES_TYPE_DEFAULT_OPACITY}}
            />
            <p
              className={styles.text} id={elem.type}
              style={{opacity: currentType === elem.type ? 1 : NOTES_TYPE_DEFAULT_OPACITY}}
            >
              {elem.type}
            </p>
          </button>
          ))}
      </div>
      <div className={styles.main} ref={mainContainer}>
        {getDataForCurrPage(elemsForCurrType, currentPage).map((elem) => (
          <div className={styles.row}>
            <div className={styles.translateBtn}
                 onClick={() => translateText(elem.translatedText, elem.initialText)}>
              <HomeSvgSelector iconId="translate"/>
            </div>
            <div className={styles.text}>{displayedTexts[elem.initialText] || elem.initialText}</div>
            <div
              className={styles.dragBtn}
              draggable
              onDragStart={() => handleDragStart(elem)}
              onDragEnd={handleDragEnd}
            >
              <HomeSvgSelector iconId="drag"/>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <div className={styles.wrapper}>
          <NotesButton onClick={prevPage} direction={NotesBtnDirectionEnum.Left}/>
          <div className={styles.count}>
            <p className={styles.text}>{currentPage}</p>
            <div className={styles.line}/>
            <p className={styles.text}>{getPagesCount()}</p>
          </div>
          <NotesButton onClick={nextPage} direction={NotesBtnDirectionEnum.Right}/>
        </div>
      </div>
    </div>
  );
};

export default Notes;
