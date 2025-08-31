import React from 'react';

import { ReactComponent as Email } from "./email.svg";
import { ReactComponent as Password } from "./password.svg";
import { ReactComponent as ConfirmPassword } from "./confirmPassword.svg";
import { ReactComponent as Visibility } from "./visibility.svg";
import { ReactComponent as VisibilityOff } from "./visibilityOff.svg";

import { ReactComponent as Link } from "./link.svg";

import { ReactComponent as Error } from "./error.svg";
import { ReactComponent as Warning } from "./warning.svg";
import { ReactComponent as Success } from "./success.svg";

import { ReactComponent as Tag } from "./tag.svg";

import { SvgSelector } from "../../../../ts/interfaces/types";

const AuthSvgSelector: React.FC<SvgSelector> = ({ iconId, ...props }) => {
  switch (iconId) {
    case 'email':
      return <Email {...props} />;
    case 'password':
      return <Password {...props} />;
    case 'confirmPassword':
      return <ConfirmPassword {...props} />;
    case 'visibility':
      return <Visibility {...props} />;
    case 'visibilityOff':
      return <VisibilityOff {...props} />;

    case 'link':
      return <Link {...props} />;

    case 'error':
      return <Error {...props} />;
    case 'warning':
      return <Warning {...props} />;
    case 'success':
      return <Success {...props} />;

    case 'tag':
      return <Tag {...props} />;

  default:
    return null;
  }
};

export default React.memo(AuthSvgSelector);
