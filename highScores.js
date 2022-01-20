const highScoresList = document.getElementById('highScoresList');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores
  .map((score, i) => {
    return `
     <li class="high-score"> 
     ${i + 1}-
     ${score.name} : ${score.score}
    </li>
    `;
  })
  .join('');
