import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CHAT_INSTRUCTIONS } from '../constants';

const useGeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initializeChat = useCallback((diagnosis = null) => {
    const initialMessage = {
      parts: [{
        text: "Hello, I'm Gerry, your virtual health assistant. I'm here to help you with any health-related questions you may have. How can I help you today?"
      }],
      role: "model"
    };
    
    setMessages([initialMessage]);
    setError(null);
    return [initialMessage];
  }, []);

  const sendMessage = useCallback(async (userMessage, diagnosis = null) => {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      const errorMsg = 'Gemini API key is not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
      const errorMsg = 'Please provide a valid message';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);

    try {
      const userMessageObj = {
        parts: [{ text: userMessage.trim() }],
        role: "user"
      };

      // Add user message to current messages
      const currentMessages = [...messages, userMessageObj];
      setMessages(currentMessages);

      // Prepare chat history (exclude the initial model message if it exists)
      let sanitizedMessages = currentMessages;
      if (currentMessages.length > 0 && currentMessages[0].role === "model") {
        sanitizedMessages = currentMessages.slice(1);
      }
      
      // Remove the last message (the one we just added) from history as it will be sent separately
      const chatHistory = sanitizedMessages.slice(0, -1);

      // Prepare system instructions with optional diagnosis context
      const systemInstructions = CHAT_INSTRUCTIONS + 
        (diagnosis ? '\nThe user has already received the following diagnosis:\n' + JSON.stringify(diagnosis) : '');

      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemInstructions
      });

      const chat = model.startChat({
        history: chatHistory
      });

      const result = await chat.sendMessage(userMessage.trim());
      
      if (!result.response) {
        throw new Error('No response received from Gemini API');
      }

      const candidates = result.response.candidates;
      if (!candidates || candidates.length === 0) {
        throw new Error('No candidates in Gemini API response');
      }

      const responseContent = candidates[0].content;
      if (!responseContent) {
        throw new Error('Invalid content in Gemini API response');
      }

      // Add AI response to messages
      const updatedMessages = [...currentMessages, responseContent];
      setMessages(updatedMessages);

      return {
        messages: updatedMessages,
        lastMessage: responseContent
      };

    } catch (err) {
      let errorMessage = 'An unexpected error occurred while sending message';
      
      if (err.message.includes('API key')) {
        errorMessage = 'Invalid API key. Please check your Gemini API configuration.';
      } else if (err.message.includes('quota') || err.message.includes('limit')) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (err.message.includes('network') || err.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (err.message.includes('safety') || err.message.includes('blocked')) {
        errorMessage = 'Message was blocked for safety reasons. Please rephrase your question.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      console.error('Chat error:', err);
      setError(errorMessage);
      
      // Remove the user message that failed to get a response
      setMessages(messages);
      
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setLoading(false);
  }, []);

  const reset = useCallback(() => {
    clearChat();
  }, [clearChat]);

  return {
    messages,
    loading,
    error,
    initializeChat,
    sendMessage,
    clearChat,
    reset
  };
};

export default useGeminiChat;