"use strict";

var debug = 0;

var userScore = 0;
var computerScore = 0;
var result;
var reason;

var outcome = { computerWins:"You LOST", userWins: "You WON", draw: "You DREW" };

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

    if (debug > 0) console.log("Result " + result + " because " + reason);
}

function updateScore() {
    switch(result) {
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

function updateResult() {
    if (debug > 1) console.log("updateResult()");
    document.getElementById("result").innerText = result + " because " + reason;
}

function runGame() {
    if (debug > 1) console.log("Rock Paper Scissors Lizard Spock Game");
    var user = userGuess();
    var computer = computerGuess();
    evaluate(user, computer);
    updateScore();
    updateResult();
}