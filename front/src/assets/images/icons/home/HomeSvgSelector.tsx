import React from 'react';

import { SvgSelector } from "../../../../ts/interfaces/types";

// main header arrows
import { ReactComponent as ArrowLeft } from './arrowLeft.svg';
import { ReactComponent as ArrowRight } from './arrowRight.svg';

import { ReactComponent as Settings } from './settings.svg';

import { ReactComponent as Weak } from './weak.svg';
import { ReactComponent as Medium } from './medium.svg';
import { ReactComponent as Strong } from './strong.svg';

import { ReactComponent as Translate } from './translate.svg';
// notes arrows
import { ReactComponent as NotesArrowLeft } from './notesArrowLeft.svg';
import { ReactComponent as NotesArrowRight } from './notesArrowRight.svg';

import { ReactComponent as BookWeak } from './book-weak.svg';
import { ReactComponent as BookMedium } from './book-medium.svg';
import { ReactComponent as BookStrong } from './book-strong.svg';

import { ReactComponent as Drag } from './drag.svg';

const HomeSvgSelector: React.FC<SvgSelector> = ({ iconId, ...props }) => {
  switch (iconId) {
    case 'arrowLeft':
      return <ArrowLeft {...props} />;
    case 'arrowRight':
      return <ArrowRight {...props} />;

    case 'settings':
      return <Settings {...props} />;

    case 'weak':
      return <Weak {...props} />;
    case 'medium':
      return <Medium {...props} />;
    case 'strong':
      return <Strong {...props} />;

    case 'translate':
      return <Translate {...props} />;

    case 'notesArrowLeft':
      return <NotesArrowLeft {...props} />;
    case 'notesArrowRight':
      return <NotesArrowRight {...props} />;

    case 'bookWeak':
      return <BookWeak {...props} />;
    case 'bookMedium':
      return <BookMedium {...props} />;
    case 'bookStrong':
      return <BookStrong {...props} />;

    case 'drag':
      return <Drag {...props} />;

  default:
    return null;
  }
}

export default React.memo(HomeSvgSelector);
