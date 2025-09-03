import { useState, useCallback, useMemo } from 'react';
import { QUESTIONS } from '../constants';

const useQuestions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);

  const questions = useMemo(() => QUESTIONS, []);
  
  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex] || null;
  }, [questions, currentQuestionIndex]);

  const isFirstQuestion = useMemo(() => currentQuestionIndex === 0, [currentQuestionIndex]);
  const isLastQuestion = useMemo(() => currentQuestionIndex === questions.length - 1, [currentQuestionIndex, questions.length]);
  const totalQuestions = useMemo(() => questions.length, [questions.length]);
  const progress = useMemo(() => ((currentQuestionIndex + 1) / questions.length) * 100, [currentQuestionIndex, questions.length]);

  const getAnswerForQuestion = useCallback((questionId) => {
    return answers.find(answer => answer.questionId === questionId);
  }, [answers]);

  const getCurrentAnswer = useCallback(() => {
    if (!currentQuestion) return null;
    return getAnswerForQuestion(currentQuestion.id);
  }, [currentQuestion, getAnswerForQuestion]);

  const answerQuestion = useCallback((questionId, answer) => {
    setError(null);
    
    try {
      if (!questionId || answer === undefined || answer === null) {
        throw new Error('Question ID and answer are required');
      }

      const question = questions.find(q => q.id === questionId);
      if (!question) {
        throw new Error(`Question with ID ${questionId} not found`);
      }

      // Validate answer format
      if (question.multiSelect) {
        if (!Array.isArray(answer)) {
          throw new Error('Multi-select questions require an array of answers');
        }
        if (answer.length === 0) {
          throw new Error('Please select at least one option');
        }
        // Check if all selected options are valid
        const invalidOptions = answer.filter(opt => !question.options.includes(opt));
        if (invalidOptions.length > 0) {
          throw new Error(`Invalid options selected: ${invalidOptions.join(', ')}`);
        }
      } else {
        if (Array.isArray(answer)) {
          throw new Error('Single-select questions require a single answer');
        }
        if (!question.options.includes(answer)) {
          throw new Error(`Invalid option selected: ${answer}`);
        }
      }

      setAnswers(prevAnswers => {
        const existingIndex = prevAnswers.findIndex(a => a.questionId === questionId);
        const newAnswer = { questionId, answer };
        
        if (existingIndex >= 0) {
          // Update existing answer
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingIndex] = newAnswer;
          return updatedAnswers;
        } else {
          // Add new answer
          return [...prevAnswers, newAnswer];
        }
      });

      return true;
    } catch (err) {
      console.error('Error answering question:', err);
      setError(err.message);
      return false;
    }
  }, [questions]);

  const goToNextQuestion = useCallback(() => {
    setError(null);
    
    if (isLastQuestion) {
      setError('Already at the last question');
      return false;
    }

    // Check if current question is answered
    const currentAnswer = getCurrentAnswer();
    if (!currentAnswer) {
      setError('Please answer the current question before proceeding');
      return false;
    }

    setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1));
    return true;
  }, [isLastQuestion, getCurrentAnswer, questions.length]);

  const goToPreviousQuestion = useCallback(() => {
    setError(null);
    
    if (isFirstQuestion) {
      setError('Already at the first question');
      return false;
    }

    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
    return true;
  }, [isFirstQuestion]);

  const goToQuestion = useCallback((index) => {
    setError(null);
    
    if (index < 0 || index >= questions.length) {
      setError(`Invalid question index: ${index}`);
      return false;
    }

    setCurrentQuestionIndex(index);
    return true;
  }, [questions.length]);

  const isQuestionnaireComplete = useCallback(() => {
    return answers.length === questions.length && 
           questions.every(q => answers.some(a => a.questionId === q.id));
  }, [answers, questions]);

  const getUnansweredQuestions = useCallback(() => {
    return questions.filter(q => !answers.some(a => a.questionId === q.id));
  }, [questions, answers]);

  const reset = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setError(null);
  }, []);

  const getAllAnswers = useCallback(() => {
    return [...answers];
  }, [answers]);

  const getAnswerSummary = useCallback(() => {
    return questions.map(question => {
      const answer = getAnswerForQuestion(question.id);
      return {
        question: question.displayText,
        answer: answer ? answer.answer : 'Not answered',
        questionId: question.id
      };
    });
  }, [questions, getAnswerForQuestion]);

  return {
    // Current state
    currentQuestion,
    currentQuestionIndex,
    answers,
    error,
    
    // Question navigation
    isFirstQuestion,
    isLastQuestion,
    totalQuestions,
    progress,
    
    // Actions
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    goToQuestion,
    reset,
    
    // Utilities
    getCurrentAnswer,
    getAnswerForQuestion,
    getAllAnswers,
    isQuestionnaireComplete,
    getUnansweredQuestions,
    getAnswerSummary,
    
    // Data
    questions: questions
  };
};

export default useQuestions;