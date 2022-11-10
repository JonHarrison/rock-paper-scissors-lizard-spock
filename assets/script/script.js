console.log("Rock Paper Scissors Lizard Spock Game");

var guesses = ["rock", "paper", "scissors", "lizard", "spock"];
var userScore = 0;
var computerScore = 0;

function updateResult() {
    document.getElementById("result").innerHTMLelement[i] = " YOU LOST!";
}

function computerGuess() {
    var val = Math.floor(Math.random() * guesses.length);
    // console.log("guess is " + guess);
    var guess = guesses[val];
    console.log("computer has guessed " + guess);
    return guess;
}

function userGuess() {
    console.log("userGuess()");

    var element = document.getElementsByName("userGuess");
    var guess = 0;

    for (var i = 0; i < element.length; i++) {
        if (element[i].checked) {
            guess = element[i].id;
            break;
        }
    }
    console.log("user has guessed " + guess);
    return guess;
}

function evaluate(user, computer) {
    var result;
    var reason;
    console.log("evaluate");
    if (user === computer) {
        result = "Draw";
        reason = "you both made the same guess";
    }
    else {
        switch (user) {
            case "rock":
                if (computer == "scissors") {
                    result = "You Won";
                    reason = "rock blunts scissors";
                }
                else if (computer == "lizard") {
                    result = "You Won";
                    reason = "rock crushes lizard";
                }
                else { result = "Computer Won"; }
                break;
            case "paper":
                if (computer == "rock") {
                    result = "You Won";
                    reason = "paper wraps rock";
                }
                else if (computer == "spock") {
                    result = "You Won";
                    reason = "paper disproves spock";
                }
                else { result = "Computer Won"; }
                break;
            case "scissors":
                if (computer == "paper") {
                    result = "You Won";
                    reason = "scissors cuts paper";
                }
                if (computer == "lizard") {
                    result = "You Won";
                    reason = "scissors decapitates lizard";
                }
                else { result = "Computer Won"; }
                break;
            case "lizard":
                if (computer == "paper") {
                    result = "You Won";
                    reason = "lizard eats paper";
                }
                else if (computer == "spock") {
                    result = "You Won";
                    reason = "lizard poisons Spock";
                }
                else { result = "Computer Won"; }
                break;
            case "spock":
                if (computer == "scissors") {
                    result = "You Won";
                    reason = "Spock smashes scissors";
                }
                else if (computer == "rock") {
                    result = "You Won";
                    reason = "Spock vapourises rock";
                }
                else { result = "Computer Won"; }
                break;
            default:
                console.log("Hmm, we shouldn't be here!");
                break;
        }
    }
    switch(result) {
        case "You Won":
            userScore++;
            break;
        case "Computer Won":
            computerScore++;
            break;
        case "Draw":
            // nothing to do 
            break;
        default:
            console.log("Hmm, we shouldn't be here!");
            break;           
    }
    console.log("Result " + result + " because " + reason);
}

function runGame() {
    var user = userGuess();
    var computer = computerGuess();
    evaluate(user, computer);
}