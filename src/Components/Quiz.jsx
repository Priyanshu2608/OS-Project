import React, { useState, useEffect } from 'react';
const allQuestions = [
  {
    question: "What is the main goal of CPU scheduling?",
    options: ["To increase CPU utilization", "To reduce memory usage", "To increase I/O speed", "To decrease process count"],
    answer: "To increase CPU utilization"
  },
  {
    question: "In First Come First Serve (FCFS) scheduling, processes are executed based on which order?",
    options: ["Priority", "Arrival time", "Burst time", "Deadline"],
    answer: "Arrival time"
  },
  {
    question: "Which scheduling algorithm can lead to the 'convoy effect'?",
    options: ["Shortest Job First (SJF)", "First Come First Serve (FCFS)", "Round Robin (RR)", "Priority Scheduling"],
    answer: "First Come First Serve (FCFS)"
  },
  {
    question: "In Shortest Job First (SJF) scheduling, which process is selected next?",
    options: ["Process with highest priority", "Process with least arrival time", "Process with smallest burst time", "Process with longest burst time"],
    answer: "Process with smallest burst time"
  },
  {
    question: "Shortest Remaining Time First (SRTF) is the ______ version of SJF.",
    options: ["Preemptive", "Non-preemptive", "Static", "Hybrid"],
    answer: "Preemptive"
  },
  {
    question: "Which of the following can cause starvation in SJF scheduling?",
    options: ["Large CPU burst processes", "Small CPU burst processes", "Equal burst processes", "None of these"],
    answer: "Large CPU burst processes"
  },
  {
    question: "In Round Robin (RR) scheduling, each process is assigned a fixed time called what?",
    options: ["Time slice", "Quantum burst", "CPU slot", "Priority slot"],
    answer: "Time slice"
  },
  {
    question: "Round Robin scheduling is most suitable for which type of system?",
    options: ["Batch system", "Real-time system", "Time-sharing system", "Distributed system"],
    answer: "Time-sharing system"
  },
  {
    question: "In Priority Scheduling, what determines the order of execution?",
    options: ["Arrival time", "CPU burst time", "Priority value", "Waiting time"],
    answer: "Priority value"
  },
  {
    question: "Which problem is commonly associated with Priority Scheduling?",
    options: ["Thrashing", "Starvation", "Deadlock", "Paging"],
    answer: "Starvation"
  },
  {
    question: "What is the solution to starvation in Priority Scheduling?",
    options: ["Aging", "Preemption", "Increasing time quantum", "Priority inversion"],
    answer: "Aging"
  },
  {
    question: "In Multilevel Queue Scheduling, processes are divided based on what?",
    options: ["Arrival time", "Type or priority of process", "CPU burst time", "Memory usage"],
    answer: "Type or priority of process"
  },
  {
    question: "Which of the following is true about Multilevel Queue Scheduling?",
    options: ["Processes can move between queues", "Processes remain permanently in one queue", "All queues have same scheduling policy", "No priorities between queues"],
    answer: "Processes remain permanently in one queue"
  },
  {
    question: "In Multilevel Feedback Queue Scheduling, processes can move between queues based on ______.",
    options: ["Memory allocation", "I/O usage", "Behavior and CPU burst", "Arrival time"],
    answer: "Behavior and CPU burst"
  },
  {
    question: "Which scheduling algorithm is considered the most flexible?",
    options: ["FCFS", "SJF", "Priority", "Multilevel Feedback Queue"],
    answer: "Multilevel Feedback Queue"
  }
];

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
  }, []);

  const handleAnswer = (option) => {
    if (isDisabled) return;

    const isCorrect = option === questions[currentQuestion].answer;
    setSelectedOption(option);
    setCorrectAnswer(questions[currentQuestion].answer);
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    setIsDisabled(true);

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setMistakes(mistakes + 1);
      if (mistakes + 1 >= 3) {
        setShowScore(true);
        return;
      }
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
        setCorrectAnswer(null);
        setAnswerStatus('');
        setIsDisabled(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-900 text-yellow-50">
      <h1 className="mb-8 text-4xl font-bold text-center text-yellow-400 md:text-5xl">CPU Scheduling Quiz</h1>

      {showScore ? (
        <div className="p-6 text-center bg-gray-800 rounded-lg shadow-md">
          <h2 className="mb-4 text-3xl">Final Score: {score}</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 font-bold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-md">
          <p className="mb-4 text-xl md:text-2xl">{questions[currentQuestion]?.question}</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isDisabled}
                className={`font-bold py-2 px-4 rounded-lg ${
                  option === correctAnswer ? 
                    (option === selectedOption ? 'bg-green-600' : 'bg-green-800') :
                    (option === selectedOption && answerStatus === 'incorrect' ? 'bg-red-600' : 'bg-yellow-600 hover:bg-yellow-700')
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="text-lg">Score: {score}</p>
            <p className="text-lg">Mistakes Left: {3 - mistakes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;

