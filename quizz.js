// This file has been combine with html file

const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of India?",
    options: ["Mumbai", "Dehli", "Chennai", "Kolkata"],
    // Actually its work index value: 0 , 1, 2, 3
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Saturn", "Mars"],
    // Actually its work index value: 0 , 1, 2, 3
    correctAnswer: 3
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
    // Actually its work index value: 0 , 1, 2, 3
    correctAnswer: 0
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    // Actually its work index value: 0 , 1, 2, 3
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Au", "Gd", "Ag"],
    // Actually its work index value: 0 , 1, 2, 3
    correctAnswer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const quizContent = document.getElementById("quizContent");

function renderQuestion() {
  const questionObj = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  quizContent.innerHTML = `
    <div class="progress-container">
      <div class="flex-space">
        <span>Question ${currentQuestion + 1} of ${quizQuestions.length}</span>
        <span>Score: ${score}</span>
      </div>
      <div class="progress"><div class="progress-bar" style="width:${progress}%"></div></div>
    </div>

    <h3>${questionObj.question}</h3>
    <div id="options">
      ${questionObj.options.map((opt, index) => `
        <button class="option-btn ${selectedAnswer === index ? "selected" : ""}" 
          onclick="selectAnswer(${index})">${opt}</button>
      `).join("")}
    </div>

    <button class="action-btn" onclick="nextQuestion()" ${selectedAnswer === null ? "disabled" : ""}>
      ${currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
    </button>
  `;
}

function selectAnswer(index) {
  selectedAnswer = index;
  renderQuestion();
}

function nextQuestion() {
  if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
    score++;
  }

  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    selectedAnswer = null;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let message = "";
  if (score === quizQuestions.length) {
    message = "Perfect score! Amazing job!";
  } else if (score >= quizQuestions.length * 0.7) {
    message = "Great job! Well done!";
  } else if (score >= quizQuestions.length * 0.5) {
    message = "Good effort! Keep practicing!";
  } else {
    message = "Keep learning and try again!";
  }

  quizContent.innerHTML = `
    <div class="result">
      <h2>Quiz Completed!</h2>
      <p>Your score: ${score} out of ${quizQuestions.length}</p>
      <p>${message}</p>
      <button class="action-btn" onclick="restartQuiz()">Play Again</button>
    </div>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  renderQuestion();
}

renderQuestion();