import React from "react";
import styles from "./HomePage.module.css";
import logo from "../assets/upraised-logo.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/questions"); // Navigate to the QuestionPage
  };

  return (
    <div className={styles.home}>
      <div className={styles.logo}>
        <img src={logo} alt="Upraised Logo" className={styles.logoImage} />
      </div>
      <h1 className={styles.quizTitle}>Quiz</h1>
      <button className={styles.startButton} onClick={handleStartClick}>
        Start
      </button>
    </div>
  );
}

export default HomePage;
