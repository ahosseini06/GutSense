// Home.jsx simplified
import React from "react";
import styles from "./styles/home.module.css";
import ChatSection from "../components/ChatSection/ChatSection"; 
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const handleStartForm = () => {
    navigate("/form");
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
          <ChatSection />
        </section>
      </div>
    </>
  );
}