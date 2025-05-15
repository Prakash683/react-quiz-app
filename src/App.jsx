import { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  function startQuiz() {
    setQuizStarted(true);
  }

  return (
    <div className="App">
      {quizStarted ? <Quiz /> : <Home onStart={startQuiz} />}
    </div>
  );
}
