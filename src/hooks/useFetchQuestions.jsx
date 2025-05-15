// src/hooks/useFetchQuestions.js
import { useEffect, useState } from 'react';

export function useFetchQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map(q => ({
          question: q.question,
          correctAnswer: q.correct_answer,
          options: shuffle([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuestions(formatted);
        setLoading(false);
      });
  }, []);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return { questions, loading };
}
