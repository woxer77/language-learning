module.exports = function tokenTimelineToMs(timeline) {
  const number = parseInt(timeline, 10);
  const dateTime = timeline.at(-1);

  switch (dateTime) {
  case 'ms': return number;
  case 's': return number * 1000;
  case 'm': return number * 1000 * 60;
  case 'h': return number * 1000 * 60 * 60;
  case 'd': return number * 1000 * 60 * 60 * 24;
  case 'w': return number * 1000 * 60 * 60 * 24 * 7;
  case 'y': return number * 1000 * 60 * 60 * 24 * 365;

  default: return number;
  }
};
