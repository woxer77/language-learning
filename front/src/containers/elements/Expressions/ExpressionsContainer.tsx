import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getExpressions } from '../../../services/notes';
import { setExpressions } from "../../../redux/slices/currVideoSlice";

import { InteractionTypeEnum} from "../../../ts/enums/enums";
import { INotesElement, UserIdType } from "../../../ts/interfaces/types";

import Notes from '../../../components/elements/Notes/Notes';
import Loading from "../../../components/UI/Loading/Loading";
import { useAppDispatch } from "../../../hooks/common/redux";

interface ExpressionsContainerProps {
  userId: UserIdType;
}

const ExpressionsContainer: React.FC<ExpressionsContainerProps> = ({ userId }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['getExpressions', userId],
    queryFn: () => getExpressions(userId)
  });
  const expressions = data?.data as INotesElement[] || [];
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setExpressions(expressions));
    }
  }, [isLoading, isError, expressions]);

  if (isLoading || isError) return <Loading />;

  return <Notes notesType={InteractionTypeEnum.Expression} />;
};

export default React.memo(ExpressionsContainer);
