import React, { useEffect } from "react";
import styles from "./question.module.css";

const Question = ({ question, answerQuestion, currentAnswer }) => {
  const [selected, setSelected] = React.useState(
    currentAnswer?.answer || (question.multiSelect ? [] : null)
  );
  const multiSelect = question.multiSelect;

  useEffect(() => {
    setSelected(currentAnswer?.answer || (question.multiSelect ? [] : null));
  }, [question, currentAnswer]);

  const handleOptionClick = (option, index) => {
    let newSelected;
    if (multiSelect) {
      if (selected && selected.includes(option)) {
        newSelected = selected.filter((item) => item !== option);
      } else {
        newSelected = selected ? [...selected, option] : [option];
      }
    } else {
      newSelected = option;
    }
    
    setSelected(newSelected);
    answerQuestion(question.id, newSelected);
  };

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        {question.displayText}
        {multiSelect && (
          <span style={{ fontWeight: "300" }}>
            {" (Select all that apply)"}
          </span>
        )}
      </div>
      <div className={styles.options}>
        {question.options.map((option, index) => {
          const isSelected = multiSelect 
            ? (selected && selected.includes(option))
            : (selected === option);
            
          return (
            <div
              className={isSelected ? styles.selected : styles.option}
              key={index}
              onClick={() => handleOptionClick(option, index)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
