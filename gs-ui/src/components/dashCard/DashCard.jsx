import React from "react";
import { Children } from "react";
import styles from "./DashCard.module.css";

const DashCard = ({ title, direction, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default DashCard;
