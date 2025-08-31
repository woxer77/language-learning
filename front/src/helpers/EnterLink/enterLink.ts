import { MAX_PLAYLIST_ID_LENGTH, MAX_VIDEO_ID_LENGTH } from "../../configs/config";

const linkOptions = {
  required: 'Required',
  pattern: {
    value: /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=|playlist\?list=))((\w|-){11})(?:\S+)?$/,
    message: 'Only YouTube link',
  }
};

const getId = (link: string) => {
  let id: string;

  if (link.includes('v=')) {
    id = link.split('v=')[1].substring(0, MAX_VIDEO_ID_LENGTH);
  } else {
    id = link.split('list=')[1].substring(0, MAX_PLAYLIST_ID_LENGTH);
  }

  return id;
}

export { linkOptions, getId };
