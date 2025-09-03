// ChatSection.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatSection.module.css";
import { useGeminiChat } from "../../hooks";
import { toast } from 'react-toastify';

const ChatSection = ({ diagnosis, title }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const {
    messages: chatMessages,
    loading,
    error,
    initializeChat,
    sendMessage
  } = useGeminiChat();
  
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize chat when component mounts
    const initialMessages = initializeChat(diagnosis);
    setMessages(initialMessages.map(m => ({
      text: m.parts[0].text,
      sender: m.role
    })));
  }, [diagnosis, initializeChat]);

  useEffect(() => {
    // Update local messages when chat messages change
    if (chatMessages.length > 0) {
      setMessages(chatMessages.map(m => ({
        text: m.parts[0].text,
        sender: m.role
      })));
    }
  }, [chatMessages]);

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const formatMessage = (text) => {
    if (!text) return text;
    
    // Replace *text* with <strong>text</strong> for bold
    let formatted = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    
    // Replace **text** with <strong>text</strong> for bold (markdown style)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace _text_ with <em>text</em> for italic
    formatted = formatted.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Replace line breaks with <br> tags
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  };

  const handleSendMessage = async (userMessage) => {
    try {
      await sendMessage(userMessage, diagnosis);
    } catch (error) {
      console.error('Chat error:', error);
      // Error is already handled by the hook and toast
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await handleSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>{title}</h3>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.sender === "model"
                ? styles.botMessage
                : styles.userMessage
            }`}
          >
            {message.sender === "model" ? (
              <div dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }} />
            ) : (
              message.text
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className={styles.input}
        />
        <button 
          type="submit" 
          className={styles.sendButton}
          disabled={loading || !newMessage.trim()}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatSection;
