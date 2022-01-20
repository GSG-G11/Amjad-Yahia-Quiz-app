import questions from './questions.js';

// ELEMENTS
const $questionEl = document.getElementById('question');
const $choicesEl = Array.from(document.querySelectorAll('.choice-text'));
const $questionCount = document.getElementById('questionCount');
const $scoreText = document.getElementById('score');
const $progressBarFull = document.getElementById('progressBarFull');

//* CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const startGame = () => {
  // resetting game
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
};

const getNewQuestion = () => {
  if (!availableQuestions.length || questionCounter >= MAX_QUESTIONS) {
    // go to end page
    return window.location.assign('/end.html');
  }

  questionCounter++;
  $questionCount.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

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

    let classToApply = 'incorrect';

    // CHECK ANSWER
    if (selectedAnswer === currentQuestion.answer) {
      classToApply = 'correct';
    }

    // UPDATE SCORE
    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});

const incrementScore = (number) => {
  score += number;
  $scoreText.innerText = score;
};
startGame();
