const holeContainer = document.querySelector(".hole-container");
const gameContainer = document.querySelector(".game-container");
const gameOverMessage = document.querySelector("#game-over-message");
const remainingTimeDisplay = document.querySelector("#time-remaining");
const startButton = document.querySelector("#start-button");
const whackCountDisplay = document.querySelector("#whack-count");

const hitSound = new Audio("assets/hit-3.wav");
const missSound = new Audio("assets/cancel-3.wav");

let gameOver = false;
let gameLoop;
let numHoles = 8;
let time;
let whacks = 0;

function startGame() {
	gameOver = false;
	time = 10;
	whacks = 0;
	gameOverMessage.hidden = true;
	startButton.hidden = true;
	remainingTimeDisplay.innerText = time;
	whackCountDisplay.innerText = whacks;
	generateHoles(numHoles);
}

function endGame() {
	gameOver = true;
	clearInterval(gameLoop);
	gameOverMessage.hidden = false;
	startButton.hidden = false;
	while (holeContainer.firstChild) {
		holeContainer.removeChild(holeContainer.firstChild);
	}
}

function generateHoles(numHoles) {
	let newHole;
	for (let i = 0; i < numHoles; i++) {
		newHole = document.createElement("div");
		newHole.classList.add("hole");
		newHole.id = `hole-${i}`;
		newHole.onclick = e => {
			console.log(e.target.id);
			whack(e.target);
		};
		holeContainer.append(newHole);
	}
}

function getRandomHoleId(numHoles) {
	let max = numHoles;
	let randomHole = Math.floor(Math.random() * (max - 1));
	return `hole-${randomHole}`;
}

function spawnMole(rate) {
	let moleHole = document.getElementById(getRandomHoleId(numHoles));
	moleHole.classList.add("mole");

	setTimeout(() => {
		if (moleHole.classList.contains("mole")) {
			moleHole.classList.remove("mole");
		}
	}, rate);
}

function whack(target) {
	if (target.classList.contains("mole")) {
		whacks++;
		whackCountDisplay.innerText = whacks;
		target.classList.remove("mole");
		hitSound.play();
	} else {
		missSound.play();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	startButton.addEventListener("click", () => {
		startGame();
		gameLoop = setInterval(() => {
			if (!gameOver) {
				spawnMole(900);
				time--;
				remainingTimeDisplay.innerText = time;
				if (time === 0) endGame();
			}
		}, 1000);
	});
});