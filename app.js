const dino = document.getElementById("dino");
const barrier = document.getElementById("barrier");
const startMessage = document.getElementById("space-bar");
const scoreDisplay = document.getElementById("score");
const jumpSound = new Audio("jump.mp3");
const crashSound = new Audio("crash.mp3");


startMessage.textContent = "Press SPACE-BAR to Start the game";

let isJumping = false;
let gameStarted = false;
let gameLoop;
let scoreTimer;
let score = 0;

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    if (!gameStarted) {
      startGame();
    }

    if (!isJumping) {
      jumpSound.currentTime = 0;
      jumpSound.play();
      jump();
    }
  }
});

function startGame() {
  gameStarted = true;
  startMessage.style.display = "none";
  moveBarrier();
  startScoreTimer();
}

function jump() {
  let position = 0;
  isJumping = true;

  const upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        dino.style.bottom = position + "px";
      }, 20);
    }

    position += 5;
    dino.style.bottom = position + "px";
  }, 20);
}

function moveBarrier() {
  let barrierPosition = 1000;
  const speed = 10;

  gameLoop = setInterval(() => {
    if (barrierPosition < -20) {
      barrierPosition = 1000;
    } else {
      barrierPosition -= speed;
      barrier.style.left = barrierPosition + "px";
    }

    const dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
    if (barrierPosition < 90 && barrierPosition > 50 && dinoBottom < 40) {
      crashSound.currentTime = 0;
      crashSound.play();
      clearInterval(gameLoop);
      clearInterval(scoreTimer); //  Stop score timer
      setTimeout(() => {
        alert("Game Over! Your score: " + score + "s");
        window.location.reload();
      }, 300);
    }
  }, 20);
}

function startScoreTimer() {
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  scoreTimer = setInterval(() => {
    score += 1;
    scoreDisplay.textContent = "Score: " + score + "s";
  }, 1000); 
}
