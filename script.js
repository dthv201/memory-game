// Game variables
var playerName = '';
var pairCount = 15;
var cards = [];
//the arry i'll create for compering my cards
var flippedCards = [];
//i need for my pointss
var matches = 0;
//for keeping my scores
var score = 0;
var timer = null;
var timerDisplay = document.getElementById('timerDisplay');

// Form page elements
var entryPage = document.getElementById('entryPage');
var playerNameInput = document.getElementById('playerName');
var pairCountInput = document.getElementById('pairCount');
var startGameBtn = document.getElementById('startGameBtn');

// Game page elements
var gamePage = document.getElementById('gamePage');
var playerNameDisplay = document.getElementById('playerNameDisplay');
var gameBoard = document.getElementById('gameBoard');
var scoreDisplay = document.getElementById('scoreDisplay');

startGameBtn.addEventListener('click', function () {
    playerName = playerNameInput.value;
    pairCount = pairCountInput.value;
    startGame();
});

function startGame() {
    entryPage.style.display = 'none';
    gamePage.style.display = 'block';

    playerNameDisplay.textContent = 'Player: ' + playerName;
    scoreDisplay.textContent = score;

    generateCards(pairCount);
    renderBoard();
    startTimer();
}
//NEED TO FIND A SULUTION FOR THE TIMER
function restartGame() {
    entryPage.style.display = 'block';
    gamePage.style.display = 'none';
    playerName = '';
    pairCount = 15;
    cards = [];
    //the arry i'll create for compering my cards
    flippedCards = [];
    //i need for my pointss
    matches = 0;
    //for keeping my scores
    score = 0;
    timer = null;
    layerNameInput.value = '';
}

function generateCards(pairCount) {
    // var colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'brown', 'gray', 'cyan',];
    var colors = ['#26001B',
        '#FFD3A3',
        '#FCFFB2',
        '#0C134F',
        '#2CD3E1',
        '#BA90C6',
        '#B3C99C',
        '#867070',
        '#B2A4FF',
        '#9376E0',
        '#B70404',
        '#FF6000',
        '#FFEA20',
        '#116D6E',
        '#A9907E'];
    //do it twice becase i need pairs
    for (var i = 0; i < pairCount; i++) {
        //i set my card atributes is the color of the back and the id i gave in the creration
        cards.push({ color: colors[i], id: i });
        cards.push({ color: colors[i], id: i });
    }

    // Shuffle cards
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}

function renderBoard() {
    gameBoard.innerHTML = '';
    for (var i = 0; i < cards.length; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-card', cards[i].id);

        var cardFront = document.createElement('div');
        cardFront.className = 'card-face card-front';

        var cardBack = document.createElement('div');
        cardBack.className = 'card-face card-back';
        cardBack.style.backgroundColor = cards[i].color;

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        card.addEventListener('click', flipCard);

        gameBoard.appendChild(card);
    }
}
// function renderBoard() {
//     gameBoard.innerHTML = '';

//     var gridContainer = document.createElement('div');
//     gridContainer.className = 'grid-container';

//     for (var i = 0; i < cards.length; i++) {
//         var card = document.createElement('div');
//         card.className = 'card';
//         card.setAttribute('data-card', cards[i].value);

//         var cardFront = document.createElement('div');
//         cardFront.className = 'card-face card-front';
//         card.appendChild(cardFront);

//         var cardBack = document.createElement('div');
//         cardBack.className = 'card-face card-back';
//         cardBack.style.backgroundColor = cards[i].color;
//         card.appendChild(cardBack);

//         card.addEventListener('click', flipCard);
//         gridContainer.appendChild(card);
//     }

//     gameBoard.appendChild(gridContainer);
// }



function flipCard() {
    //i can't flip more than one card
    if (flippedCards.length < 2) {
        var card = this;
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }
}
//check if i found a match
function checkMatch() {
    var card1 = flippedCards[0];
    var card2 = flippedCards[1];

    if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
        // Matched!
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        matches++;
        score += 2;
        if (matches == pairCount) {
            // Game over, show a message or perform any desired action
            alert(`Congratulations ${playerName}! You have matched all pairs! Your score is ${score} In time of: ${timerDisplay.value}`);
            stopTimer();
            restartGame();


        }
    } else {
        // Not a match, flip back the cards
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        score--;
    }

    flippedCards = [];
    scoreDisplay.textContent = score;
}

function startTimer() {
    var startTime = Date.now();
    timer = setInterval(function () {
        var totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;

        timerDisplay.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}