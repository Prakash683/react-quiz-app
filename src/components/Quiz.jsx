import { useState, useEffect } from "react";
import { questions } from "../components/Questions.jsx";

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const currentQuestion = questions[currentIndex];

  // Shuffle options when question changes
  useEffect(() => {
    setShuffledOptions(shuffleArray(currentQuestion.options));
    setSelectedAnswer(null);
    setTimeLeft(15);
  }, [currentIndex, currentQuestion.options]);

  // Timer effect
  useEffect(() => {
    if (showResult || selectedAnswer !== null) return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, selectedAnswer, showResult]);

  function handleAnswer(option) {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  }

  function handleNextQuestion() {
    const next = currentIndex + 1;
    if (next < questions.length) {
      setCurrentIndex(next);
    } else {
      setShowResult(true);
    }
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
    setSelectedAnswer(null);
  }

  // Calculate progress percentage for progress bar
  const progressPercent = (currentIndex / questions.length) * 100;

  if (showResult) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>
          You scored {score} out of {questions.length}
        </h2>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>
      <p>Time Left: {timeLeft} seconds</p>

      <h3>{currentQuestion.question}</h3>

      {shuffledOptions.map((option) => {
        const isCorrect = option === currentQuestion.correctAnswer;
        const isSelected = option === selectedAnswer;

        let className = "option-btn";
        if (selectedAnswer) {
          if (isCorrect) className += " correct";
          else if (isSelected && !isCorrect) className += " wrong";
        }

        return (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className={className}
            disabled={!!selectedAnswer}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
