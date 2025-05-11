const holes = document.querySelectorAll('.hole');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

let score = 0;
let gameTime = 30;
let gameInterval;
let moleTimeout;
let currentHole;

function randomHole() {
  holes.forEach(hole => {
    hole.classList.remove('active-mole');
    hole.classList.remove('active-bomb');
  });

  const index = Math.floor(Math.random() * holes.length);
  currentHole = holes[index];

  const isBomb = Math.random() < 0.3; // 30% chance to show a bomb
  if (isBomb) {
    currentHole.classList.add('active-bomb');
    currentHole.dataset.type = 'bomb';
  } else {
    currentHole.classList.add('active-mole');
    currentHole.dataset.type = 'mole';
  }

  moleTimeout = setTimeout(randomHole, 700);
}

holes.forEach(hole => {
  hole.addEventListener('click', () => {
    const type = hole.dataset.type;
    if (type === 'mole' && hole.classList.contains('active-mole')) {
      score++;
    } else if (type === 'bomb' && hole.classList.contains('active-bomb')) {
      score = 0;
      alert("💥 Oops! You clicked a bomb!");
    }
    scoreEl.textContent = score;
    hole.classList.remove('active-mole', 'active-bomb');
  });
});

function startGame() {
  score = 0;
  gameTime = 30;
  scoreEl.textContent = score;
  timeEl.textContent = gameTime;
  startBtn.disabled = true;

  randomHole();

  gameInterval = setInterval(() => {
    gameTime--;
    timeEl.textContent = gameTime;
    if (gameTime === 0) {
      clearInterval(gameInterval);
      clearTimeout(moleTimeout);
      holes.forEach(hole => hole.classList.remove('active-mole', 'active-bomb'));
      startBtn.disabled = false;
      alert(`Game Over! Your final score: ${score}`);
    }
  }, 1000);
}

startBtn.addEventListener('click', startGame);
