// DiagnosisForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestions, useGeminiDiagnosis } from "../hooks";
import Question from "../components/question/Question";
import styles from "./styles/Form.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "../components/navbar/Navbar";
import Error from "../components/error/Error";
import Loading from "../components/loading/Loading";
import LoadingBar from "../components/loadingBar/LoadingBar";
import { FaForward } from "react-icons/fa";
import { toast } from 'react-toastify';

function DiagnosisForm() {
  const navigate = useNavigate();
  const {
    currentQuestion,
    currentQuestionIndex,
    answers,
    error: questionError,
    isFirstQuestion,
    isLastQuestion,
    totalQuestions,
    progress,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    getAllAnswers,
    isQuestionnaireComplete
  } = useQuestions();
  
  const { 
    diagnosis, 
    loading: diagnosisLoading, 
    error: diagnosisError, 
    generateDiagnosis 
  } = useGeminiDiagnosis();
  
  const [loading, setLoading] = useState(false);

  const getAnswers = () => getAllAnswers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isQuestionnaireComplete()) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    try {
      setLoading(true);
      const userAnswers = getAllAnswers().filter((answer) => answer.answer !== null && answer.answer !== '');
      
      if (userAnswers.length === 0) {
        toast.error('Please answer at least one question');
        return;
      }
      
      const diagnosisResult = await generateDiagnosis(userAnswers);
      
      // Save to local storage
      const pastResults = localStorage.getItem("past-results");
      localStorage.setItem(
        "past-results",
        JSON.stringify([
          ...(pastResults ? JSON.parse(pastResults) : []),
          { data: diagnosisResult },
        ])
      );
      
      // Navigate to diagnosis page
      navigate("/diagnosis", { state: { data: diagnosisResult } });
      
    } catch (error) {
      console.error("Error generating diagnosis:", error);
      toast.error(error.message || 'Failed to generate diagnosis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Listen for left and right key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 37 && !isFirstQuestion) {
        goToPreviousQuestion();
      }
      if (e.keyCode === 39 && !isLastQuestion) {
        const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
        if (currentAnswer && currentAnswer.answer) {
          goToNextQuestion();
        }
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentQuestion, answers, isFirstQuestion, isLastQuestion, goToNextQuestion, goToPreviousQuestion]);

  return (
    <>
      <Navbar style={{ width: "100vw" }} />
      <LoadingBar completion={progress}></LoadingBar>
      {(questionError || diagnosisError) && <Error />}
      {currentQuestion && !loading && !diagnosisLoading && (
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Does your gut need a hand?</h1>

          <div className={styles.body}>
            <div className={styles.questionContainer}>
              <div
                className={styles.navigateLeft}
                onClick={!isFirstQuestion ? goToPreviousQuestion : null}
              >
                {!isFirstQuestion && (
                  <IoIosArrowBack
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </div>

              <Question
                question={currentQuestion}
                answerQuestion={answerQuestion}
                currentAnswer={answers.find(a => a.questionId === currentQuestion?.id)}
              />
              
              <div className={styles.navigateRight}>
                {(() => {
                  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
                  const hasAnswer = currentAnswer && 
                    ((Array.isArray(currentAnswer.answer) && currentAnswer.answer.length > 0) || 
                     (!Array.isArray(currentAnswer.answer) && currentAnswer.answer !== null && currentAnswer.answer !== ''));
                  
                  if (hasAnswer) {
                    if (!isLastQuestion) {
                      return (
                        <IoIosArrowForward
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          onClick={goToNextQuestion}
                        />
                      );
                    } else {
                      return (
                        <FaForward
                          style={{
                            width: "90%",
                            height: "90%",
                            color: "green",
                          }}
                          onClick={handleSubmit}
                        />
                      );
                    }
                  }
                  return null;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
      {(loading || diagnosisLoading) && <Loading />}
    </>
  );
}

export default DiagnosisForm;
