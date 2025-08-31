import React from 'react';

import { SvgSelector } from "../../../../ts/interfaces/types";

import { ReactComponent as History } from './history.svg';
import { ReactComponent as Close } from './close.svg';

const HomeSvgSelector: React.FC<SvgSelector> = ({ iconId, ...props }) => {
  switch (iconId) {
    case 'history':
      return <History {...props} />;
    case 'close':
      return <Close {...props} />;

  default:
    return null;
  }
}

export default React.memo(HomeSvgSelector);
