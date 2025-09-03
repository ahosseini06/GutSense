import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { diagnosisSchema, QUESTIONS, SYSTEM_PROMPT } from '../constants';

const useGeminiDiagnosis = () => {
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePrompt = useCallback((answers) => {
    try {
      const questions = QUESTIONS.map((question) => question.text);
      
      const filledStatements = questions.map((question, index) => {
        const answerObj = answers.find((answer) => answer.questionId === index + 1);
        
        if (!answerObj) {
          throw new Error(`Missing answer for question ${index + 1}`);
        }
        
        let response = answerObj.answer;
        
        if (Array.isArray(response)) {
          response = response.join(", ");
        }
        
        return question.replace("______", response);
      });
      
      return filledStatements.join("\n");
    } catch (err) {
      throw new Error(`Failed to generate prompt: ${err.message}`);
    }
  }, []);

  const generateDiagnosis = useCallback(async (userAnswers) => {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      const errorMsg = 'Gemini API key is not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    if (!userAnswers || !Array.isArray(userAnswers) || userAnswers.length === 0) {
      const errorMsg = 'Invalid user answers provided';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);
    
    try {
      const prompt = generatePrompt(userAnswers);
      
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: diagnosisSchema,
        },
        systemInstruction: SYSTEM_PROMPT
      });

      const result = await model.generateContent(prompt);
      
      if (!result.response) {
        throw new Error('No response received from Gemini API');
      }

      const candidates = result.response.candidates;
      if (!candidates || candidates.length === 0) {
        throw new Error('No candidates in Gemini API response');
      }

      const content = candidates[0].content;
      if (!content || !content.parts || content.parts.length === 0) {
        throw new Error('Invalid content structure in Gemini API response');
      }

      const completion = content.parts[0].text;
      if (!completion) {
        throw new Error('Empty text in Gemini API response');
      }

      let completionJSON;
      try {
        completionJSON = JSON.parse(completion);
      } catch (parseErr) {
        throw new Error(`Failed to parse Gemini API response as JSON: ${parseErr.message}`);
      }

      const diagnosisResult = {
        ...completionJSON,
        date: new Date().toISOString()
      };

      setDiagnosis(diagnosisResult);
      return diagnosisResult;
      
    } catch (err) {
      let errorMessage = 'An unexpected error occurred while generating diagnosis';
      
      if (err.message.includes('API key')) {
        errorMessage = 'Invalid API key. Please check your Gemini API configuration.';
      } else if (err.message.includes('quota') || err.message.includes('limit')) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (err.message.includes('network') || err.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      console.error('Diagnosis generation error:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [generatePrompt]);

  const reset = useCallback(() => {
    setDiagnosis(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    diagnosis,
    loading,
    error,
    generateDiagnosis,
    reset
  };
};

export default useGeminiDiagnosis;