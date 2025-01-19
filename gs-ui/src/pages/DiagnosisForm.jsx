// DiagnosisForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddEntityMutation,
  useGetEntitiesQuery,
} from "../services/gutsense";
import Question from "../components/question/Question";
import styles from "./styles/Form.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "../components/navbar/Navbar";

function DiagnosisForm() {
  const navigate = useNavigate();
  const [addEntity] = useAddEntityMutation();
  const QUESTIONS = useGetEntitiesQuery({ name: "questions" });
  console.log(QUESTIONS);

  // We'll keep an array of answers, each item can be either a string or an array of strings (for multi-select).
  // answer is : {questionId: int
  //             answer: string or array of strings}
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (QUESTIONS.data) {
      setAnswers(
        QUESTIONS.data.map((question) => ({
          questionId: question.id,
          answer: question.multiSelect ? [] : null,
        }))
      );
      setLoading(false);
    }
  }, [QUESTIONS]);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [loading, setLoading] = useState(true);

  const getAnswers = () => answers;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post data to your endpoint
      setLoading(true);
      const response = await addEntity({
        name: "diagnoses",
        body: {
          data: {
            answers: answers.filter((answer) => answer.answer),
          },
        },
      });

      const data = response;
      // Navigate to the diagnosis page with the response in state
      const pastResults = localStorage.getItem("past-results");
      localStorage.setItem("past-results", JSON.stringify([...(pastResults ? JSON.parse(pastResults) : []), data]));
      navigate("/diagnosis", { state: data });
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      // In a real app, show an error message to the user
    }
  };

  //remove later
  useEffect(() => {
    console.log(answers);
  }, [answers]);

  //listen for left and right key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 37 && currentQuestion > 1) {
        setCurrentQuestion(currentQuestion - 1);
      }
      if (
        e.keyCode === 39 &&
        answers[currentQuestion - 1] &&
        answers[currentQuestion - 1].answer &&
        currentQuestion < QUESTIONS.data.length
      ) {
        setCurrentQuestion(currentQuestion + 1);
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentQuestion, answers]);

  return (
    <>
      <Navbar style={{ width: "100vw" }} />
      {QUESTIONS.data && !loading && (
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Does your gut need a hand?</h1>

          <div className={styles.body}>
            <div className={styles.questionContainer}>
              <div
                className={styles.navigateLeft}
                onClick={
                  currentQuestion > 1
                    ? () => setCurrentQuestion(currentQuestion - 1)
                    : null
                }
              >
                {currentQuestion > 1 && (
                  <IoIosArrowBack
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </div>

              <Question
                setGlobalResponse={setAnswers}
                question={QUESTIONS.data[currentQuestion - 1]}
                setCurrentQuestion={setCurrentQuestion}
                getAnswers={answers}
              ></Question>
              <div className={styles.navigateRight}>
                {answers[currentQuestion - 1] &&
                  answers[currentQuestion - 1].answer && (
                    <IoIosArrowForward
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      onClick={
                        currentQuestion < QUESTIONS.data.length
                          ? () => setCurrentQuestion(currentQuestion + 1)
                          : handleSubmit
                      }
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <div>Loading...</div>}
    </>
  );
}

export default DiagnosisForm;
