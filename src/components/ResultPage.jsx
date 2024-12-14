import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { percentage } = location.state || { percentage: 0 };

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Result</h1>
      <p>{percentage.toFixed(2)}%</p>
      <button onClick={handleRestart}>Restart Quiz</button>
    </div>
  );
}

export default ResultPage;
