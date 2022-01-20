const $usernameInput = document.getElementById('username');
const $saveScoreBtn = document.getElementById('saveScoreBtn');
const $finalScore = document.getElementById('finalScore');

const mostRecentScore = localStorage.getItem('mostRecentScore');

$finalScore.innerText = mostRecentScore;

$usernameInput.addEventListener('keyup', () => {
  $saveScoreBtn.disabled = !$usernameInput.value;
});

const saveHighScore = (e) => {
  e.preventDefault();
};
