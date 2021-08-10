const holeContainer = document.querySelector(".hole-container");
const gameContainer = document.querySelector(".game-container");
const remainingTimeDisplay = document.querySelector("#time-remaining");
const whackCountDisplay = document.querySelector("#whack-count");
const startButton = document.querySelector("#start-button");
const gameOverMessage = document.querySelector("#game-over-message");

let gameOver = false;
let numHoles = 8;
let time;
let whacks = 0;
let gameLoop;

function startGame() {
	gameOver = false;
	gameOverMessage.hidden = true;
	time = 10;
	remainingTimeDisplay.innerText = time;
	whacks = 0;
	whackCountDisplay.innerText = whacks;
	generateHoles(numHoles);
	spawnMole(1000);
}

function whack(target) {
	if (target.classList.contains("mole")) {
		whacks++;
		whackCountDisplay.innerText = whacks;
		target.classList.remove("mole");
		let hitSound = new Audio("hit-3.wav");
		hitSound.play();
	} else {
		let missSound = new Audio("cancel-3.wav");
		missSound.play();
	}
}

function getRandomHoleId(numHoles) {
	let max = numHoles;
	let randomHole = Math.floor(Math.random() * (max - 1));
	console.log(`spawning at hole-${randomHole}`)
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

function checkTimer() {
	if (time === 0) {
		endGame();
	}
}

function endGame() {
	gameOver = true;
	gameOverMessage.hidden = false;
	clearInterval(gameLoop);
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

document.addEventListener("DOMContentLoaded", () => {
	startButton.addEventListener("click", () => {
		startButton.hidden = true;
		startGame();
		gameLoop = setInterval(() => {
			if (!gameOver) {
				spawnMole(900);
				time--;
				remainingTimeDisplay.innerText = time;
				checkTimer();
			}
		}, 1000);
	});
});
