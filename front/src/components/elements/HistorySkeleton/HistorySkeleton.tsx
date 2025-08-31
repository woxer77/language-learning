import React from 'react';

import Skeleton from "react-loading-skeleton";

import styles from './HistorySkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css'

const HistorySkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image}>
        <Skeleton width="250px" height="100%" />
      </div>
      <div className={styles.information}>
        <div className={styles.row}>
          <Skeleton width="100%" height="40px" />
        </div>
        <div className={styles.row}>
          <Skeleton width="50%" height="20px" />
        </div>
        <div className="divider"/>
        <div className={styles.row}>
          <Skeleton width="50%" height="20px" />
          <Skeleton width="50%" height="20px" />
        </div>
      </div>

    </div>
  );
};

export default HistorySkeleton;
