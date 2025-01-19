// components/ChatSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatSection.module.css';
import { useAddEntityMutation } from '../../../src/services/gutsense';

const ChatSection = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [addEntity] = useAddEntityMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // addEntity({name: 'chat-session', body: {data: {messages}}}); // await on this when calling it

  useEffect(() => {
    if (messages.length > 1) {
        scrollToBottom();
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>Chat with Gerry</h3>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`${styles.message} ${
              message.sender === 'model' ? styles.botMessage : styles.userMessage
            }`}
          >
            {message.text}
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
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatSection;