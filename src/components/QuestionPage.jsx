import React, { useState } from "react";
import styles from "./QuestionPage.module.css";

function QuestionPage() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 1,
      text: "Which of these are valid state management tools in React?",
      options: ["useState", "Redux", "Context API", "LocalStorage"],
      correctAnswers: ["useState", "Redux", "Context API"],
    },
    {
      id: 2,
      text: "What does this image represent in CSS?",
      options: ["Box model", "Flexbox", "CSS grid", "Overflow handling"],
      image: "https://i.imgur.com/mWTV3Oj.png",
      correctAnswer: "Box model",
    },
    {
      id: 3,
      text: "What does 'useEffect' do in React?",
      options: [
        "Fetch data",
        "Manage state",
        "Handle lifecycle events",
        "Optimize performance",
      ],
      correctAnswer: "Handle lifecycle events",
    },
    {
      id: 4,
      text: "What is the purpose of the 'flexbox' in CSS?",
      options: [
        "Layout management",
        "Text formatting",
        "Animations",
        "Responsive design",
      ],
      image: "https://i.imgur.com/TxxU7hf.png",
      correctAnswer: "Layout management",
    },
    {
      id: 5,
      text: "Which JavaScript method is used to select an element by its ID?",
      options: [
        "getElementById",
        "querySelector",
        "getElementsByClassName",
        "querySelectorAll",
      ],
      correctAnswer: "getElementById",
    },
  ];

  const handleOptionClick = (questionId, option) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert("All questions answered!");
    }
  };

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
                selectedOptions[questions[currentQuestion].id] === option
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handleOptionClick(questions[currentQuestion].id, option)
              }
            >
              <div
                className={`${styles.circle} ${
                  selectedOptions[questions[currentQuestion].id] === option
                    ? styles.selectedCircle
                    : ""
                }`}
              />
              <span className={styles.optionText}>{option}</span>
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={handleNext}>
          <span className={styles.buttonText}>Next</span>
          <svg
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.arrowIcon}
          >
            <path
              d="M3 8h10M8 3l5 5-5 5"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default QuestionPage;
