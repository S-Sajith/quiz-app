import React from "react";
import styles from "./HomePage.module.css";
import logo from "../assets/upraised-logo.png";

function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles.logo}>
        <img src={logo} alt="Upraised Logo" className={styles.logoImage} />
      </div>
      <h1 className={styles.quizTitle}>Quiz</h1>
      <button className={styles.startButton}>Start</button>
    </div>
  );
}

export default HomePage;
