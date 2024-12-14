import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ResultPage.module.css";
import GuageComponent from "./GuageComponent";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, wrongAnswers, percentage } = location.state || {
    correctAnswers: 0,
    wrongAnswers: 0,
    percentage: 0,
  };

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardText}>Your Result</div>
        <GuageComponent percentage={percentage.toFixed(2)} />
        <div className={styles.resultDetails}>
          <div className={`${styles.option} ${styles.correctAnswer}`}>
            <div className={`${styles.circle} ${styles.correctCircle}`} />
            <span className={styles.optionText}>
              <span className={styles.boldText}>{correctAnswers}</span> Correct
            </span>
          </div>
          <div className={`${styles.option} ${styles.wrongAnswer}`}>
            <div className={`${styles.circle} ${styles.wrongCircle}`} />
            <span className={styles.optionText}>
              <span className={styles.boldText}>{wrongAnswers}</span> Incorrect
            </span>
          </div>
        </div>
        <button onClick={handleRestart} className={styles.button}>
          <span className={styles.buttonText}>Start Again</span>
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
