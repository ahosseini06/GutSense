// Home.jsx simplified
import React from "react";
import styles from "./styles/about.module.css";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router";

export default function AboutUs() {
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
            <h3>Inspiration</h3>

            <div>
            Our product was inspired by the rising prevalence of gut health conditions, and the lack of access to to specialized doctors in this field.
            This problem is especially challenging in under-served communities with a lack of medical professionals overall. 
            <h3>Product Vision</h3>
            <div>
            Our goal was to allow opportunities for anyone to gain meaningful insight into their current health condition as a first step, while also tracking their conditions over time.
            The incorporation of Gerry also allows quick access to health insights the same way a conversation with an ER professional. 
            Our vision is to have GutSense help telehealth companies and Hospital ER departments more effectively process patients with gut health challenges, and offering an initial diagnosis access to people in underserverd communities.
            </div>
            </div>

            
        
        </div>
        
      </div>
    </>
  );
}