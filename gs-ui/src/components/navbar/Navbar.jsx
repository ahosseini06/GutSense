import React from "react";
import styles from "../../pages/styles/home.module.css";
import logo from "../../assets/GutSense_Logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleStartForm = () => {
    navigate("/form");
  };
  const handleGoToResult = () => {
    navigate("/diagnosis");
  };
  const handleGoHome = () => {
    navigate("/");
  };
  const handleGoToAbout = () => {
    navigate("/about-us");
  };
  return (
    
    <nav className={styles.header}>
      <div className={styles["logo-container"]}>
        <img
          src={logo}
          alt="GutSense Logo"
          className={styles["logo-image"]}
          onClick={handleGoHome}
          // style={{ width: '200px', height: '200px' }}
        />
        {/* <h1 className="logo-text">GutSense</h1> */}
      </div>
      <div className={styles["menu"]}>
        <div className={styles["question_button"]} onClick={handleStartForm}>
          <button className={styles.menuButton}>Questionnaire</button>
        </div>
        <div className={styles["results_button"]} onClick={handleGoToResult}>
          <button className={styles.menuButton}>Test Results</button>
        </div>
        <div className={styles["about_button"]} onClick={handleGoToAbout}>
          <button className={styles.menuButton}>About Us</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
