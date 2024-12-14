import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import QuestionPage from "./components/QuestionPage";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
