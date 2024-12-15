import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuestionPage.module.css";

function QuestionPage() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://9376r.wiremockapi.cloud/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load questions.");
        setLoading(false);
      });
  }, []);

  const handleOptionClick = (questionId, option) => {
    const question = questions.find((q) => q.id === questionId);

    if (Array.isArray(question.correctAnswers)) {
      // Multiple correct answers - allow multiple selections
      const currentSelections = selectedOptions[questionId] || [];
      if (currentSelections.includes(option)) {
        // If already selected, deselect it
        setSelectedOptions({
          ...selectedOptions,
          [questionId]: currentSelections.filter((opt) => opt !== option),
        });
      } else {
        // Add the new selection
        setSelectedOptions({
          ...selectedOptions,
          [questionId]: [...currentSelections, option],
        });
      }
    } else {
      // Single correct answer - only allow one selection
      setSelectedOptions({ ...selectedOptions, [questionId]: option });
    }
  };

  const handleNext = async () => {
    const endTime = Date.now();
    const timeTakenInMs = endTime - startTime;

    const minutes = Math.floor(timeTakenInMs / 60000);
    const seconds = Math.floor((timeTakenInMs % 60000) / 1000);
    const timeTaken = `${minutes}m ${seconds}s`;

    const payload = {
      questionId: questions[currentQuestion].id,
      selectedOption: selectedOptions[questions[currentQuestion].id],
      timeTaken: timeTaken,
    };

    try {
      const response = await fetch(
        "https://9376r.wiremockapi.cloud/questions/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      const data = await response.json();

      if (data.status === "success") {
        console.log("Answer successfully submitted:", data.message);
      } else {
        throw new Error("API response indicates failure: " + data.message);
      }

      setStartTime(Date.now());
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // If it's the last question, call the API to get the final score
        handleGetScore();
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  const handleGetScore = async () => {
    let score = 0;

    questions.forEach((question) => {
      const selected = selectedOptions[question.id];
      if (Array.isArray(question.correctAnswers)) {
        if (
          selected &&
          question.correctAnswers.every((ans) => selected.includes(ans)) &&
          selected.length === question.correctAnswers.length
        ) {
          score++;
        }
      } else if (selected === question.correctAnswer) {
        score++;
      }
    });

    const correctAnswers = score;
    const wrongAnswers = questions.length - correctAnswers;
    const percentage = (score / questions.length) * 100;

    try {
      const response = await fetch(
        "https://9376r.wiremockapi.cloud/questions/get-score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correctAnswers,
            wrongAnswers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch score");
      }

      // Navigate to the result page with the score data
      navigate("/result", {
        state: { correctAnswers, wrongAnswers, percentage },
      });
    } catch (err) {
      console.error("Error fetching score:", err);
    }
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>{error}</div>
        <button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const { text, options, image } = questions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.progressHeader}>
        <div className={styles.progressCircleWrapper}>
          <svg
            className={styles.progressCircle}
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <circle
              className={styles.progressCircleBg}
              cx="50"
              cy="50"
              r="45"
              stroke="#ddd"
              strokeWidth="5"
              fill="none"
            />
            <circle
              className={styles.progressCircleFill}
              cx="50"
              cy="50"
              r="45"
              stroke="#39d2a4"
              strokeWidth="5"
              fill="none"
              strokeDasharray="282.743" // Circumference of the circle (2πr)
              strokeDashoffset={(1 - progressPercent / 100) * 282.743} // progress percentage
            />
          </svg>
          <div className={styles.progressNumber}>
            <span className={styles.currentQuestion}>
              {currentQuestion + 1}
            </span>
            <span className={styles.separator}>/</span>
            <span className={styles.totalQuestions}>{questions.length}</span>
          </div>
        </div>
      </div>

      <div className={styles.questionCard}>
        <div className={styles.questionText}>{text}</div>
        {image && (
          <img
            src={image}
            alt="Question illustration"
            className={styles.questionImage}
          />
        )}
        <div className={styles.options}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`${styles.option} ${
                Array.isArray(selectedOptions[questions[currentQuestion].id])
                  ? selectedOptions[questions[currentQuestion].id].includes(
                      option
                    )
                    ? styles.selected
                    : ""
                  : selectedOptions[questions[currentQuestion].id] === option
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handleOptionClick(questions[currentQuestion].id, option)
              }
            >
              <div
                className={`${styles.circle} ${
                  Array.isArray(selectedOptions[questions[currentQuestion].id])
                    ? selectedOptions[questions[currentQuestion].id].includes(
                        option
                      )
                      ? styles.selectedCircle
                      : ""
                    : selectedOptions[questions[currentQuestion].id] === option
                    ? styles.selectedCircle
                    : ""
                }`}
              />
              <span className={styles.optionText}>{option}</span>
            </div>
          ))}
        </div>
        {currentQuestion < questions.length - 1 ? (
          <button className={styles.button} onClick={handleNext}>
            <span className={styles.buttonText}>Next</span>
          </button>
        ) : (
          <button className={styles.button} onClick={handleNext}>
            <span className={styles.buttonText}>Submit</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionPage;
