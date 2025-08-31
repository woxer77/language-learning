import { RED_COLOR, ORANGE_COLOR, GREEN_COLOR } from '../../configs/config';

const getColor = (type: string): string => {
  switch (type) {
    case 'error':
      return RED_COLOR;
    case 'warning':
      return ORANGE_COLOR;
    case 'success':
      return GREEN_COLOR;
    default:
      return '';
  }
};

export { getColor };
