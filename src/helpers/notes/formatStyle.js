const formatArrFromDbStyle = (textArr) => {
  return textArr.map(({ initial_text, translated_text, type, time }) => ({
    initialText: initial_text,
    translatedText: translated_text,
    type,
    time,
  }));
}

const formatToDbStyle = (text) => {
  return {
    initial_text: text.initialText,
    translated_text: text.translatedText,
    type: text.type,
    time: text.time,
    user_id: text.userId,
  };
}

module.exports = { formatArrFromDbStyle, formatToDbStyle };
