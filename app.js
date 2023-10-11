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
    }
}

const cardContainer = document.getElementById('cardContainer');
const cards = Array.from(cardContainer.getElementsByClassName('cards'));

shuffleArray(cards);

cardContainer.innerHTML = '';

cards.forEach(card => {
    cardContainer.appendChild(card);
});
   
let counter = 0;
let firstSelection = "";
let secondSelection = "";

const grid1 = document.querySelectorAll(".grid1 .cards");
grid1.forEach((cards) => {
    cards.addEventListener("click", () => {
       cards.classList.add("clicked");
       
       if(counter === 0) {
        firstSelection = cards.getAttribute("hp");
        counter++;
       } else {
        secondSelection = cards.getAttribute("hp");
        counter=0;
            if(firstSelection === secondSelection) {
                const correctCards = document.querySelectorAll(
                ".cards[hp='" + secondSelection + "']");
                correctCards[0].classList.add("correct");
                correctCards[0].classList.add("disappear")
                correctCards[0].classList.remove("clicked");
                correctCards[1].classList.add("correct");
                correctCards[1].classList.add("disappear")
                correctCards[1].classList.remove("clicked");

                score += 1;
                scoreCount.textContent = score;

                if (score === 14) {
                    window.location.href = "winner.html";
                };

            } else {
                const incorrectCards = document.querySelectorAll(".cards.clicked");
                incorrectCards[0].classList.add("shake");
                incorrectCards[1].classList.add("shake");

                if (lives > 0) {
                    console.log(lives)
                    lives -= 1;
                    livesCount.textContent = lives;
                }

                setTimeout(() => {
                    incorrectCards[0].classList.remove("shake");
                    incorrectCards[0].classList.remove("clicked");
                    incorrectCards[1].classList.remove("shake");
                    incorrectCards[1].classList.remove("clicked");
                }, 800);

                if (lives === 0) {
                    window.location.href = "looser.html";
                };

            };
       };
    });
});