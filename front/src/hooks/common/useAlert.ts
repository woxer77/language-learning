import React from 'react';

import { ActivateAlertProps } from "../../ts/interfaces/types";
import { AlertTypeEnum } from "../../ts/enums/enums";
import { IAlert } from "../../ts/interfaces/types";

interface IUseAlert extends IAlert {
  activateAlert: ActivateAlertProps;
}

export function useAlert(): IUseAlert {
  const [alert, setAlert] = React.useState<IAlert>({ isActive: false, message: '', type: AlertTypeEnum.Error });
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const activateAlert: ActivateAlertProps = (message, type, ms) => {
    setAlert({ isActive: true, message: message, type: type });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setAlert(prevState => ({
        ...prevState, isActive: false }));
    }, ms);
  };

  return {
    ...alert,
    activateAlert
  };
}
