import React from 'react';

import { createLettersHashMap } from "../../helpers/TypeArea/typeArea";
import { useAppSelector } from "../common/redux";

const useWordsMap = () => {
  const words = useAppSelector(state => state.currVideoReducer.words);

  const hashMap = createLettersHashMap();
  const newHashMap = new Map(hashMap); // Create a new Map with the same entries as alphabetMap

  const [alphabetMap, setAlphabetMap] = React.useState<Map<string, object[]> | undefined>(newHashMap);

  React.useEffect(() => {
    if (words.length === 0) return;

    words.forEach((word) => {
      const initialLetter = word.initialText[0].toLowerCase();
      const prevArr = newHashMap.get(initialLetter) || [];
      newHashMap.set(initialLetter, [...prevArr, word]);
    });
    console.log('useWordsMap render', newHashMap);
    console.log('words', words);
    setAlphabetMap(newHashMap); // Update alphabetMap with the new Map instance
  }, [words]);

  return { alphabetMap };
};

export default useWordsMap;
