import React from 'react';

import styles from './Dialog.module.scss';

interface DialogProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Dialog: React.FC<DialogProps> = ({ children, className, style }) => {
  const dialogClassName = className ? `${styles.dialog} ${className}` : styles.dialog;

  return (
    <div className={dialogClassName} style={style}>
      {children}
    </div>
  );
};

export default Dialog;
