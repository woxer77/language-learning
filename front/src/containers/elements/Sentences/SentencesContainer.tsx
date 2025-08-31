import React, {MouseEventHandler} from 'react';

import {ISentence, UserIdType} from "../../../ts/interfaces/types";
import {useAppDispatch} from "../../../hooks/common/redux";
import {useQuery} from "@tanstack/react-query";
import {getSentences} from "../../../services/sentences";
import {setSentences} from "../../../redux/slices/currVideoSlice";
import Loading from "../../../components/UI/Loading/Loading";

import Sentences from "../../../components/elements/Sentences/Sentences";

interface SentencesContainerProps {
    userId: UserIdType;
    videoId: string;
    sentencesRef: React.LegacyRef<HTMLDivElement>;
    handleSelectText: MouseEventHandler<HTMLDivElement>;
    isNumsShown: boolean;
    alphabetMap: Map<string, object[]> | undefined;
    divForScrollRef: React.LegacyRef<HTMLDivElement>;
}

const SentencesContainer: React.FC<SentencesContainerProps> = ({
    userId,
    videoId,
    sentencesRef,
    handleSelectText,
    isNumsShown,
    alphabetMap,
    divForScrollRef
  }) => {
  const dispatch = useAppDispatch();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['getSentences', videoId],
    queryFn: () => getSentences(userId, videoId)
  });
  const sentences: ISentence[] = Array.isArray(data?.data) ? data?.data as ISentence[] : [];

  React.useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setSentences(sentences));
    }
  }, [sentences]);
  // console.log('sentences container render', alphabetMap);
  if (isLoading || isError) return <Loading />;

  return <Sentences
      sentencesRef={sentencesRef}
      handleSelectText={handleSelectText}
      isNumsShown={isNumsShown}
      alphabetMap={alphabetMap}
      divForScrollRef={divForScrollRef}
    />;
};

export default React.memo(SentencesContainer);
