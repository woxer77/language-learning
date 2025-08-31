import React from 'react';

import {useQuery} from '@tanstack/react-query';

import Notes from '../../../components/elements/Notes/Notes';
import Loading from "../../../components/UI/Loading/Loading";

import {getWords} from '../../../services/notes';
import {InteractionTypeEnum} from "../../../ts/enums/enums";
import { INotesElement, UserIdType } from "../../../ts/interfaces/types"
import {setWords} from "../../../redux/slices/currVideoSlice";
import { useAppDispatch } from "../../../hooks/common/redux";

interface WordsContainerProps {
  userId: UserIdType;
}

const WordsContainer: React.FC<WordsContainerProps> = ({ userId }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['getWords', userId],
    queryFn: () => getWords(userId)
  });
  const words = data?.data as INotesElement[] || [];
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setWords(words));
    }
  }, [isLoading, isError, words]);

  if (isLoading || isError) return <Loading />;

  return <Notes notesType={InteractionTypeEnum.Word} />;
};

export default React.memo(WordsContainer);
