import questions from './questions.js';

// ELEMENTS
const $questionEl = document.getElementById('question');
const $choicesEl = Array.from(document.querySelectorAll('.choice-text'));

//* CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

// START GAME
const startGame = () => {
  // resetting game
  questionCount = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
};

// GET A NEW QUESTION
const getNewQuestion = () => {
  if (!availableQuestions.length || questionCount >= MAX_QUESTIONS) {
    // go to end page
    return window.location.assign('/end.html');
  }

  questionCount++;

  const randomQuestionIndex = Math.floor(
    Math.random() * availableQuestions.length
  );

  currentQuestion = availableQuestions[randomQuestionIndex];
  $questionEl.innerText = currentQuestion.question;

  $choicesEl.forEach((choice) => {
    const choiceNumber = choice.dataset['number'];
    choice.innerText = currentQuestion[`choice${choiceNumber}`];
  });

  availableQuestions.splice(randomQuestionIndex, 1);

  acceptingAnswers = true;
};

$choicesEl.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    getNewQuestion();
  });
});

startGame();
