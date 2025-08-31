const formatArrFromDbStyle = (textArr) => {
  return textArr.map(({ video_id, sentence, number }) => ({
    videoId: video_id,
    sentence,
    number
  }));
}

const formatToDbStyle = (text) => {
  return {
    video_id: text.videoId,
    sentence: text.sentence,
    number: text.number,
    user_id: text.userId,
  };
}

module.exports = { formatArrFromDbStyle, formatToDbStyle };
