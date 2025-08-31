const sentenceOptions = {
  required: 'Required'
};

const createLettersHashMap = () => {
  const hashMap = new Map();

  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i); // 97 is the ASCII code for 'a'
    hashMap.set(letter, []); // Set the letter as key and index as value
  }

  return hashMap;
};

export { sentenceOptions, createLettersHashMap }
