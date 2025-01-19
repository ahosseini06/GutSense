// Home.jsx
import React, { useState } from "react";
import styles from "./styles/home.module.css";
import ChatSection from "../components/ChatSection/ChatSection"; 
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router";
import {GoogleGenerativeAI} from "@google/generative-ai";
import { useAddEntityMutation } from '../../src/services/gutsense';



// const genAI = new GoogleGenerativeAI({ model: "gemini-1.5-flash"})

// genai.configure(api_key="GEMINI_API_KEY")
// model = genai.GenerativeModel("gemini-1.5-flash")

export default function Home() {
  const navigate = useNavigate();
  const handleStartForm = () => {
    navigate("/form");
  };

  const [addEntity] = useAddEntityMutation();

  // const [convoContext, setConvoContext] = useState({
  //   role: "You are a gut health specialist assistant named Gerry. Help users understand their gut health using evidence-based information.",
  //   systemContext: "Focus on providing medical information based on current research. Be empathetic and clear.",
  //   // Add more context
  // });

  // State for chat messages
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Gerry. How can I help you today?", sender: "model" }
  ]);

  // const handleSendMessage = async (message) => {
  //   setMessages([...messages, { text: message, sender: "user" }]);
  //   // Here you would typically handle the bot response
  //   // For now, let's add a simple response
  //   setMessages(updated)
  //   setTimeout(() => {
  //     setMessages(prev => [...prev, { 
  //       text: "Thanks for your message! I'll help you with that.", 
  //       sender: "bot" 
  //     }]);
  //   }, 1000);
  // };

  const handleSendMessage = async (userMessage) => {
    // add new message to message history
    const updatedMessages = [...messages, { text: userMessage, sender: "user" }];
    setMessages(updatedMessages);

    
      const botResponse = await addEntity({
        name:"chat-sessions",
        body: {
          data: {
            messages: updatedMessages.map(m => ({parts: [{text: m.text}], role: m.sender}))
          }
        }
      });

      // get the new bot response
      // console.log(botResponse.data.messages);
      setMessages(botResponse.data.messages.map(m => ({
        text: m.parts[0].text,
        sender: m.role
      })));
    
  };

  return (
    <>
    <div className={styles.container}>
      <Navbar />

      <main className={styles["main-content"]}>
        <h2 className={styles["main-heading"]}>
          Trust your gut,
          <br />
          it deserves the best!
        </h2>

        <p className={styles["description"]}>
          A healthy gut can increase your metabolism, which means you burn more
          calories even when you're not exercising.
        </p>

        <div className={styles["action-buttons"]}>
          <button className={styles["cta-button"]} onClick={handleStartForm}>
            Get tested today
          </button>

          <button 
            className={styles["chat-button"]}
            onClick={() => document.getElementById('chat-section').scrollIntoView({ behavior: 'smooth' })}
          >
            Chat with Gerry
          </button>
        </div>
      </main>

      
    </div>
    <div className={styles.chatSection}>
      <section id="chat-section" className={styles["chat-section"]}>
      <ChatSection messages={messages} onSendMessage={handleSendMessage} />
    </section>
    </div>
    
  </>
  );
}