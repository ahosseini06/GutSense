import React from 'react'
import styles from "./styles/home.module.css";
import logo from "../assets/GutSense_Logo.svg"
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

import './styles/home.module.css'

export default function Home() {
  return (
    
    <div className={styles.container}>
      <nav className={styles.header}>
        <div className={styles['logo-container']}>
          <img 
            src={logo}
            alt="GutSense Logo" 
            className={styles['logo-image']}
            // style={{ width: '200px', height: '200px' }}
          />
          {/* <h1 className="logo-text">GutSense</h1> */}
        </div>
        <div className={styles['menu']}>
          <div className={styles['question_button']}>
            <button className={styles.menuButton}>Questionnaire</button>
          </div>
          <div className={styles['results_button']}>
            <button className={styles.menuButton}>Test Results</button>
          </div>
        </div>
        
      </nav>
      
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
        
        <button className={styles['cta-button']}>
          Get tested today
        </button>
        
      </main>
    </div>
   
  )
}



// export default Home