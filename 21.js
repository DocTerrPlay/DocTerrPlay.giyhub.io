let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0; 

let hidden;
let deck;

let canHit = true; //allows the player (you) to draw while yourSum <= 21

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["Т", "2", "3", "4", "5", "6", "7", "8", "9", "10", "В", "Д", "К"];
    let types = ["Крести", "Пики"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 26 => (0-25.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Карты/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("Карты-Дилера").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Карты/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("Карты-ТЫ").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("Взять").addEventListener("click", hit);
    document.getElementById("Хватит").addEventListener("click", stay);

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./Карты/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("Карты-ТЫ").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("Скрытые").src = "./Карты/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "Анлаки";
    }
    else if (dealerSum > 21) {
        message = "Окуп";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Депни ещё";
    }
    else if (yourSum > dealerSum) {
        message = "Окуп";
    }
    else if (yourSum < dealerSum) {
        message = "Анлаки";
    }

    document.getElementById("Дилер-сум").innerText = dealerSum;
    document.getElementById("Ты-сум").innerText = yourSum;
    document.getElementById("Результаты").innerText = message;
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "Т") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "Т") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

<script>
// Когда пользователь нажимает на <div>, откройте всплывающее окно
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
</script>
