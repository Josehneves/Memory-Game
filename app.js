//level 1
let lives = 7;
let score = 0;

const livesCount = document.querySelector(".livesCount");
livesCount.textContent = lives;

const scoreCount = document.querySelector(".scoreCount");
scoreCount.textContent = score;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
};

const cardContainer = document.getElementById('cardContainer');
const cards = Array.from(cardContainer.getElementsByClassName('cards'));
shuffleArray(cards);

cardContainer.innerHTML = '';
cards.forEach(card => {
    cardContainer.appendChild(card);
});

let timer = 70;
let countdownCompleted = false;

const timerDisplay = document.createElement("span");
timerDisplay.classList.add("timer");
document.getElementById('timer-container').appendChild(timerDisplay);
timerDisplay.textContent = timer;

startTimer();

function startTimer() {
    const allCards = document.querySelectorAll(".cards img");

    allCards.forEach((card) => {
        card.style.opacity = 1;
    });

    const intervalId = setInterval(() => {
        timer--;

        timerDisplay.textContent = timer;

        if (timer === 0) {
            allCards.forEach((card) => {
                card.style.opacity = 0;
            });

            clearInterval(intervalId);

            countdownCompleted = true;
        }
    }, 1000);
}
let counter = 0;
let firstSelection = "";
let secondSelection = "";

const grid1 = document.querySelectorAll(".grid1 .cards");
grid1.forEach((cards) => {
    cards.addEventListener("click", handleCardClick);
});

function handleCardClick() {
    if (!countdownCompleted) {
        return;
    }

    if (this.classList.contains("clicked")) {
        return;
    }

    this.classList.add("clicked");

    if (counter === 0) {
        firstSelection = this.getAttribute("hp");
        counter++;
    } else {
        secondSelection = this.getAttribute("hp");
        counter = 0;

        if (firstSelection === secondSelection) {
            const correctCards = document.querySelectorAll(
                ".cards[hp='" + secondSelection + "']");
            correctCards.forEach((card) => {
                card.classList.add("correct", "disappear");
                card.classList.remove("clicked");
                card.removeEventListener("click", handleCardClick);
            });

            score += 1;
            scoreCount.textContent = score;

            if (score === 14) {
                window.location.href = "winner.html";
            }

        } else {
            const incorrectCards = document.querySelectorAll(".cards.clicked");
            incorrectCards.forEach((card) => {
                card.classList.add("shake");
                card.removeEventListener("click", handleCardClick);
            });

            if (lives > 0) {
                console.log(lives);
                lives -= 1;
                livesCount.textContent = lives;
            }

            setTimeout(() => {
                incorrectCards.forEach((card) => {
                    card.classList.remove("shake", "clicked");
                    card.addEventListener("click", handleCardClick);
                });
            }, 800);

            if (lives === 0) {
                window.location.href = "looser.html";
            }
        }
    }
}