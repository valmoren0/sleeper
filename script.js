let target = document.getElementById("target");
let scoreDisplay = document.getElementById("score");
let timerDisplay = document.getElementById("timerDisplay");
let messageDisplay = document.getElementById("message");
let restartButton = document.getElementById("restartButton");
let infoContainer = document.getElementById("info-container");
let score = 0;
let timeLeft = 20;
let musicStarted = false;

document.addEventListener("click", function() {
  if (!musicStarted) {
    document.getElementById("background-music").play();
    musicStarted = true;
    startTimer();
  }
});

target.addEventListener("click", function() {
  score++;
  scoreDisplay.innerHTML = score;
  moveTarget();
});

function moveTarget() {
  const containerWidth = document.getElementById("game-container").offsetWidth;
  const containerHeight = document.getElementById("game-container").offsetHeight;
  const targetSize = target.offsetWidth;
  const maxX = containerWidth - targetSize;
  const maxY = containerHeight - targetSize;

  let randomX = Math.floor(Math.random() * (maxX + 1));
  let randomY = Math.floor(Math.random() * (maxY + 1));

  if (randomX < targetSize) randomX = targetSize;
  if (randomX > maxX - targetSize) randomX = maxX - targetSize;
  if (randomY < targetSize) randomY = targetSize;
  if (randomY > maxY - targetSize) randomY = maxY - targetSize;

  target.style.left = randomX + "px";
  target.style.top = randomY + "px";

  setTimeout(moveTarget, 2000);
}

function startTimer() {
  let timer = setInterval(() => {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.innerHTML = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  target.removeEventListener("click", moveTarget);
  target.style.display = "none";
  timerDisplay.innerHTML = "Tiempo agotado";
  document.getElementById("background-music").pause();
  messageDisplay.innerHTML = "Tu puntaje es: " + score;
  restartButton.style.display = "block"; // Show the button only at the end of the game
  infoContainer.classList.remove("hidden");
}

function restartGame() {
  score = 0;
  scoreDisplay.innerHTML = score;
  timeLeft = 20;
  timerDisplay.innerHTML = "Tiempo restante: 0:20";
  messageDisplay.innerHTML = "";
  restartButton.style.display = "none"; // Hide the button when restarting the game
  infoContainer.classList.add("hidden");
  target.style.display = "block";
  moveTarget();
  startTimer();
  document.getElementById("background-music").play();
}

moveTarget();