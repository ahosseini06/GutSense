import React from "react";
import styles from "../../pages/styles/home.module.css";
import logo from "../../assets/GutSense_Logo.svg";

const Navbar = () => {
  return (
    <nav className={styles.header}>
      <div className={styles["logo-container"]}>
        <img
          src={logo}
          alt="GutSense Logo"
          className={styles["logo-image"]}
          // style={{ width: '200px', height: '200px' }}
        />
        {/* <h1 className="logo-text">GutSense</h1> */}
      </div>
      <div className={styles["menu"]}>
        <div className={styles["question_button"]}>
          <button className={styles.menuButton}>Questionnaire</button>
        </div>
        <div className={styles["results_button"]}>
          <button className={styles.menuButton}>Test Results</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
