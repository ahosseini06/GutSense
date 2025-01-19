import React from "react";
import styles from "./styles/home.module.css";
import logo from "../assets/GutSense_Logo.svg";
import { useNavigate } from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className='landing_container' >
//       {/* nav component*/}
//       <nav className='navigation'>
//         <div className='nav_items'>
//         <img
//             src="gs-ui/src/assets/GutSense_Logo.svg"
//             alt="GutSense Logo"
//             className="logo"
//           />
//           <span className="text-2xl font-bold">GutSense</span>

//         </div>

//       </nav>

//       {/* rest of main code here */}
//     </div>
//   )
// }

import "./styles/home.module.css";
import Navbar from "../components/navbar/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const handleStartForm = () => {
    navigate("/form");
  };
  return (
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

        <button className={styles["cta-button"]} onClick={handleStartForm}>
          Get tested today
        </button>
      </main>
    </div>
  );
}

// export default Home
