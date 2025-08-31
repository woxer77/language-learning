import React, { CSSProperties } from 'react';

import GlobalSvgSelector from "../../../assets/images/icons/auth/AuthSvgSelector";

import { getColor } from "../../../helpers/Alert/getColor";
import { AlertTypeEnum } from "../../../ts/enums/enums";

import styles from './Alert.module.scss';

interface AlertProps {
  message: string;
  type: AlertTypeEnum;
  isActive: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, type, isActive }) => {
  const alertStyles: CSSProperties = {
    backgroundColor: getColor(type),
    visibility: isActive ? "visible" : "hidden",
    opacity: isActive ? 1 : 0,
    transform: isActive ? "translateY(0)" : "translateY(-20px)"
  };

  return (
    <div className={styles.alert} style={alertStyles}>
      <div className={styles.content}>
        <GlobalSvgSelector iconId={type} />
        <p className={styles.text}>{message}</p>
      </div>
    </div>
  );
};

export default React.memo(Alert);
