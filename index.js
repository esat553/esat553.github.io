let playerCards = [];
let bankCards =[];
let playerSum = 0;
let bankSum = 0;
let hasBlackJack = false;
let canPlay = false; // also ist noch im game ohne über 21 gekommen zu sein.

let message = "";

let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.querySelector("#player-el");
let bankSumEl = document.getElementById("bankSum-el");
let bankCardsEl = document.querySelector("#bankCards-el");

let player = {
    name: "Esat",
    chips: 145
}

playerEl.textContent = player.name + ": " + player.chips + "€";

function startGame(){
canPlay = true;
hasBlackJack = false;
firstCard =  getRandomCard();
secondCard = getRandomCard();
playerSum = firstCard + secondCard;
playerCards = [firstCard, secondCard];
bankFirstcard = getRandomCard();
bankSecondcard = getRandomCard();
bankSum = bankFirstcard + bankSecondcard;
bankCards = [bankFirstcard, bankSecondcard];
    renderGame();
}


function renderGame() {
    gameStatusInit();
bankSumEl.textContent = "Sum:";
bankCardsEl.textContent = "Cards: " + bankCards[0] + " -";
    cardsEl.textContent = "Cards:";
for (let i = 0; i < playerCards.length; i++){
cardsEl.textContent += " " + playerCards[i];
}

    if (playerSum <= 20) {
    message = "Do you want to draw a new card?";
} else if (playerSum === 21){
    message = "Wohoo! You've got Blackjack!";
    hasBlackJack = true;
    playerWon();
} else {
    message= "You're out of the game!";
    canPlay = false;
    playerLost();
}
sumEl.textContent = "Sum: " + playerSum;
messageEl.textContent = message;
}


function newCard() {
    if(canPlay && !hasBlackJack){
    let newCard = getRandomCard();
    playerSum += newCard;
    playerCards.push(newCard);
    renderGame(); 
    }
}

function bankNewCard(){
        let newCard = getRandomCard();
        bankSum += newCard;
        bankCards.push(newCard)
        bankCardsEl.textContent += " " + newCard;
        bankSumEl.textContent = "Sum: " + bankSum;
}

function getRandomCard(){
    let randomNumber = (Math.floor(13 * Math.random()) +1);
    if (randomNumber >= 11) randomNumber = 10;
    if(randomNumber === 1) randomNumber = 11;
    return randomNumber;
}

async function hold(){
    if(canPlay && !hasBlackJack){
    canPlay = false;
    bankCardsEl.textContent = "Cards: " + bankCards[0] + " " + bankCards[1];
    bankSumEl.textContent = "Sum: " + bankSum;
    while (bankSum < playerSum){
        await sleep(2000);
        bankNewCard();
    }
    if (bankSum > 21){
        playerWon()
    } else if (bankSum === playerSum){
        unentschieden();
    } else{
        playerLost();
    }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function unentschieden(){
    document.getElementById("gameStatusU").textContent = "nobody Won";
}

function playerWon(){
    document.getElementById("gameStatusWon").textContent = "You WON!!!";
}

function playerLost(){
    document.getElementById("gameStatusLost").textContent = "You LOST";
}


//Just for initializing The GameStatus
function gameStatusInit() {
    document.getElementById("gameStatusWon").textContent = "";
    document.getElementById("gameStatusLost").textContent = "";
    document.getElementById("gameStatusU").textContent = "";
}