const cardWraps = document.querySelectorAll(".card_wrap");
const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add("open");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkFormatch();
}

function checkFormatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        isMatch ? disableCards() : unflipCards();
}

//여기까지 실제 작성

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    firstCard.classList.add("unmatched");
    secondCard.classList.add("unmatched");

    setTimeout(() => {
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
        firstCard.classList.remove("unmatched");
        secondCard.classList.remove("unmatched");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cardWraps.forEach((cardWrap) => {
        let randomPos = Math.floor(Math.random() * 12);
        cardWrap.style.order = randomPos;
    });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

setTimeout(() => {
    cards.forEach((card) => {
        card.classList.add("open");
    });
}, 100);

setTimeout(() => {
    cards.forEach((card) => {
        card.classList.remove("open");
    });
}, 4000);