"use strict";

var debug = 0; // set positive to enable debug in console

const evaluation_methods = { hash: 1, if_then_else: 2 }; // supports two methods of evaluating the game outcome
var evaluation_method = evaluation_methods.hash;

var userScore = 0; // increments each time the user wins
var computerScore = 0; // increments each time the computer wins

const outcome = { computerWins: "You LOST", userWins: "You WON", draw: "You DREW" };
var result;

var reason;

// get user guess from radio box group userGuess
function userGuess() {
    if (debug > 1) console.log("userGuess()");

    var element = document.getElementsByName("userGuess");
    var guess = 0;

    for (var i = 0; i < element.length; i++) {
        if (element[i].checked) {
            guess = element[i].id;
            break;
        }
    }
    if (debug > 0) console.log("user     : " + guess);
    return guess;
}

// get computer guess randomly
function computerGuess() {
    if (debug > 1) console.log("userGuess()");
    var guesses = ["rock", "paper", "scissors", "lizard", "spock"];
    var val = Math.floor(Math.random() * guesses.length);
    var guess = guesses[val];
    if (debug > 0) console.log("computer : " + guess);
    return guess;
}


function evaluate(user, computer) {
    if (debug > 1) console.log("evaluate(" + user + "," + computer + ")");

    if (user === computer) {
        result = outcome.draw;
        reason = "you both made the same guess";
    }
    else {
        // work out who won
        if (evaluation_method === evaluation_methods.hash) {
            // use a map / hash table

            // defines a map consisting of key,value pairs
            // the key must match the guess from the computer guesses array and html user id
            // key is the guess and the value gives a list of more key:value pairs
            // consisting of
            //   name - a displayable string
            //   id - an identifier which is used as a key into the beats hashmap of key:value pairs
            //   beats - a hashmap which gives the reason (the value) why the guess beats the id (the key)
            // for example rock crushes scissors, rock crushes lizard, paper wraps rock, paper disproves spock
            const gameRules = new Map([
                ["rock", { name: "rock", id: "ROCK", beats: { "SCISSORS": "crushes", "LIZARD": "crushes" } }],
                ["paper", { name: "paper", id: "PAPER", beats: { "ROCK": "wraps", "SPOCK": "disproves" } }],
                ["scissors", { name: "scissors", id: "SCISSORS", beats: { "PAPER": "cuts", "LIZARD": "decapitates" } }],
                ["lizard", { name: "lizard", id: "LIZARD", beats: { "PAPER": "eats", "SPOCK": "poisons" } }],
                ["spock", { name: "spock", id: "SPOCK", beats: { "SCISSORS": "smashes", "ROCK": "vaporises" } }]
            ]);

            var userChoice = gameRules.get(user); // look up user key in map
            var computerChoice = gameRules.get(computer); // look up computer key in map
            if (debug > 0) console.log("userChoice:" + userChoice.name + " computerChoice:" + computerChoice.name);
            var userWins = (userChoice.beats[computerChoice.id] !== undefined); // TRUE if user defeats computer (beats contains computer guess)
            if (userWins) {
                result = outcome.userWins;
                reason = userChoice.name + " " + userChoice.beats[computerChoice.id] + " " + computerChoice.name;
            }
            else {
                result = outcome.computerWins;
                reason = computerChoice.name + " " + computerChoice.beats[userChoice.id] + " " + userChoice.name;
            }
        }
        else {
            // use switch if then else
            switch (user) {
                case "rock":
                    if (computer == "scissors") {
                        result = outcome.userWins;
                        reason = "rock blunts scissors";
                    }
                    else if (computer == "lizard") {
                        result = outcome.userWins;
                        reason = "rock crushes lizard";
                    }
                    else if (computer == "paper") {
                        result = outcome.computerWins;
                        reason = "paper wraps rock";
                    }
                    else if (computer == "spock") {
                        result = outcome.computerWins;
                        reason = "Spock vaporises rock";
                    }
                    else {
                        console.log("Unexpected result");
                    }
                    break;
                case "paper":
                    if (computer == "rock") {
                        result = outcome.userWins;
                        reason = "paper wraps rock";
                    }
                    else if (computer == "spock") {
                        result = outcome.userWins;
                        reason = "paper disproves spock";
                    }
                    else if (computer == "scissors") {
                        result = outcome.computerWins;
                        reason = "scissors cuts paper";
                    }
                    else if (computer == "lizard") {
                        result = outcome.computerWins;
                        reason = "lizard eats paper";
                    }
                    else {
                        console.log("Unexpected result");
                    }
                    break;
                case "scissors":
                    if (computer == "paper") {
                        result = outcome.userWins;
                        reason = "scissors cuts paper";
                    }
                    else if (computer == "lizard") {
                        result = outcome.userWins;
                        reason = "scissors decapitates lizard";
                    }
                    else if (computer == "rock") {
                        result = outcome.computerWins;
                        reason = "rock blunts scissors";
                    }
                    else if (computer == "spock") {
                        result = outcome.computerWins;
                        reason = "Spock vaporises scissors";
                    }
                    else {
                        console.log("Unexpected result");
                    }
                    break;
                case "lizard":
                    if (computer == "paper") {
                        result = outcome.userWins;
                        reason = "lizard eats paper";
                    }
                    else if (computer == "spock") {
                        result = outcome.userWins;
                        reason = "lizard poisons Spock";
                    }
                    else if (computer == "rock") {
                        result = outcome.computerWins;
                        reason = "rock crushes lizard";
                    }
                    else if (computer == "scissors") {
                        result = outcome.computerWins;
                        reason = "scissors decapitates lizard";
                    }
                    else {
                        console.log("Unexpected result");
                    }
                    break;
                case "spock":
                    if (computer == "scissors") {
                        result = outcome.userWins;
                        reason = "Spock smashes scissors";
                    }
                    else if (computer == "rock") {
                        result = outcome.userWins;
                        reason = "Spock vapourises rock";
                    }
                    else if (computer == "paper") {
                        result = outcome.computerWins;
                        reason = "paper disproves Spock";
                    }
                    else if (computer == "lizard") {
                        result = outcome.computerWins;
                        reason = "lizard poisons Spock";
                    }
                    else {
                        console.log("Unexpected result");
                    }
                    break;
                default:
                    console.log("Hmm, we shouldn't be here!");
                    break;
            }
        }
    }

    if (debug > 0) console.log("Result " + result + " because " + reason);
}

function updateScore() {
    switch (result) {
        case outcome.userWins:
            userScore++;
            break;
        case outcome.computerWins:
            computerScore++;
            break;
        case outcome.draw:
            // nothing to do 
            break;
        default:
            console.log("Hmm, we shouldn't be here!");
            break;
    }
    document.getElementById("userScore").innerText = userScore;
    document.getElementById("computerScore").innerText = computerScore;
}

function updateComputerGuess(computer) {
    if (debug > 1) console.log("updateComputerGuess()");
    document.getElementById("computerGuess").innerText = computer;
}

function updateResult() {
    if (debug > 1) console.log("updateResult()");
    document.getElementById("result").innerText = result + " because " + reason;
}

function runGame() {
    if (debug > 1) console.log("Rock Paper Scissors Lizard Spock Game");
    var user = userGuess();
    var computer = computerGuess();
    updateComputerGuess(computer);
    evaluate(user, computer);
    updateScore();
    updateResult();
}