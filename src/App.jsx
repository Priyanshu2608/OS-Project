import React, { useState } from 'react';
import Quiz from './Components/Quiz.jsx';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-yellow-50">
      {!quizStarted ? (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to the CPU Scheduling Quiz</h1>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md text-left">
            <h2 className="text-2xl font-semibold mb-4">Rules:</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>Answer 5 questions in each round.</li>
              <li>Each correct answer awards 1 point.</li>
              <li>You are allowed only 3 incorrect answers.</li>
              <li>After 3 errors, the game ends and your final score will be displayed.</li>
              <li>Enjoy the quiz!</li>
            </ul>
          </div>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-lg transition-all"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
};

export default App;
