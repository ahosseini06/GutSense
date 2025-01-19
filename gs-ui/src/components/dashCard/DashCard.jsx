import React from "react";
import { Children } from "react";
import styles from "./DashCard.module.css";

const DashCard = ({ title, direction, children, width, height }) => {
  return (
    <div className={styles.card} style={{ width: width, height: height }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default DashCard;
