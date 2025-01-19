import React from "react";
import styles from "./question.module.css";

const Question = ({ setResponse, multiSelect }) => {
  const [selected, setSelected] = React.useState(null);
  return (
    <div className={styles.container}>
      <div className={styles.question}>question</div>
      <div className={styles.options}>
        
      </div>
    </div>
  );
};

export default Question;
