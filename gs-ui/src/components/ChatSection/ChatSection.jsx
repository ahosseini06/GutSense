// ChatSection.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatSection.module.css";
import { useAddEntityMutation } from "../../../src/services/gutsense";

const ChatSection = ({ diagnosis, title }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [addEntity] = useAddEntityMutation();

  // Move messages state here
  const [messages, setMessages] = useState([
    {
      text: diagnosis
        ? "How can I further assist you with your diagnosis?"
        : "Hi! I'm Gerry the Gut Guru, what can I help you with?",
      sender: "model",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async (userMessage) => {
    // add new message to message history
    const updatedMessages = [
      ...messages,
      { text: userMessage, sender: "user" },
    ];
    setMessages(updatedMessages);

    // try {
    const botResponse = await addEntity({
      name: "chat-sessions",
      body: {
        data: {
          messages: updatedMessages.map((m) => ({
            parts: [{ text: m.text }],
            role: m.sender,
          })),
          diagnosis: diagnosis,
        },
      },
    });

    setMessages(
      botResponse.data.messages.map((m) => ({
        text: m.parts[0].text,
        sender: m.role,
      }))
    );
    // } catch (error) {
    //   console.error('Error:', error);
    //   setMessages(prev => [...prev, {
    //     text: "I apologize, but I'm having trouble responding right now. Please try again.",
    //     sender: "model"
    //   }]);
    // }
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
