import React, { useEffect } from "react";
import styles from "./question.module.css";

const Question = ({
  setGlobalResponse,
  question,
  getAnswers,
  setCurrentQuestion,
  prevInput,
}) => {
  const [selected, setSelected] = React.useState(
    getAnswers.filter((answer) => answer.questionId === question.id)[0]?.answer
  );
  const multiSelect = question.multiSelect;

  useEffect(() => {
    setSelected(
      getAnswers.filter((answer) => answer.questionId === question.id)[0]
        ?.answer
    );
  }, [question, getAnswers]);

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
    console.log("newSelected: " + newSelected);
    setSelected(newSelected);
    const newAnswers = getAnswers.map((answer, i) => {
      if (i === question.id - 1) {
        return {
          answer: newSelected,
          questionId: question.id,
        };
      }
      return answer;
    });
    setGlobalResponse(newAnswers);
  };

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        {question.text}
        {multiSelect && "Select all that apply"}
      </div>
      {multiSelect && "Select all that apply"}
      <div className={styles.options}>
        {question.options.map((option, index) => (
          <div
            className={
              selected && selected.includes(option)
                ? styles.selected
                : styles.option
            }
            key={index}
            onClick={() => {
              handleOptionClick(option, index);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
