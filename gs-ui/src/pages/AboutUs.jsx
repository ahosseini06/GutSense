// Home.jsx simplified
import React from "react";
import styles from "./styles/about.module.css";
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
        <div className={styles.body}>
            <h1>About Us</h1>
            hellooooo
        </div>
        
      </div>
    </>
  );
}