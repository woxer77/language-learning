import React, { ComponentProps } from 'react';

import Loading from "../Loading/Loading";

import styles from './Button.module.scss';

type ButtonProps = ComponentProps<"button"> & {
  children: React.ReactNode;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    disabled,
    isLoading,
    onClick
  }) => {
  const buttonClassName = className ? `${styles.button} ${className}` : styles.button;

  return (
    <button className={buttonClassName} disabled={disabled || isLoading} onClick={onClick}>
      {isLoading ? <Loading /> : children}
    </button>
  );
};

export default React.memo(Button);
