import React from 'react';

import styles from './Loading.module.scss';

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => {
  const loadingClassName = className ? `${styles.spinner} ${className}` : styles.spinner;

  return (
    <div className={loadingClassName} />
  );
};

export default Loading;
