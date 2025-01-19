import React from "react";
import styles from "./LoadingBar.module.css";

const LoadingBar = ({ completion }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner} style={{ width: `${completion}%` }}></div>
    </div>
  );
};

export default LoadingBar;
