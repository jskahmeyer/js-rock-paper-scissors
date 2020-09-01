// TODO: add radial gradient around winner

// .effect-left::before {
//     content: "";
//     background: radial-gradient(#2C3B5A 38%, #293857 38% 50%, #233455 50% 100%);
//     z-index: -3;
//     border-radius: 50%;
//     position: absolute;
//     margin: 1.5rem;
// }

// .effect-right::before {
//     content: "";
//     background: radial-gradient(#2C3B5A 38%, #293857 38% 50%, #233455 50% 100%);
//     z-index: -3;
//     border-radius: 50%;
//     position: absolute;
//     margin: 1.5rem;
// }

// TODO: fix timing issues with winner reveal

const choices = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll(".btn-circle");

let userChoice = undefined;
let computerChoice = undefined;
let userScore = 0;
let message;
let stepOne = document.getElementById("step-one");
let stepTwo = document.getElementById("results");
let stepThree = document.getElementById("step-three");
let stepFour = document.getElementById("step-four");
let modal = document.getElementById("modal");
let displayUserChoice = document.getElementById("user-choice");
let displayComputerChoice = document.getElementById("computer-choice");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    resetGame();
    // stepOne.style.display = "none";
    // stepThree.style.visibility = "hidden";
    // stepFour.style.display = "none";

    userChoice = button.getAttribute("id");
    console.log(userChoice);
    makeComputerChoice();
    getStepTwo();
    setTimeout(() => {
      getStepThree();
    }, 1000);
    setTimeout(() => {
      getStepFour(userChoice, computerChoice);
    }, 2000);
  });
});

document.getElementById("reset").addEventListener("click", () => {
  stepOne.style.display = "flex";
  stepTwo.style.display = "none";
});

document.getElementById("rules").addEventListener("click", () => {
  modal.style.display = "block";
});

document.getElementById("close").addEventListener("click", () => {
  modal.style.display = "none";
});

function makeComputerChoice() {
  computerChoice = choices[Math.floor(Math.random() * choices.length)];
}

function userButton() {
  displayUserChoice.classList.add("btn-circle");
  if (userChoice == "paper") {
    displayUserChoice.innerHTML = document.getElementById("paper").innerHTML;
    displayUserChoice.classList.add("paper");
  } else if (userChoice == "scissors") {
    displayUserChoice.innerHTML = document.getElementById("scissors").innerHTML;
    displayUserChoice.classList.add("scissors");
  } else {
    displayUserChoice.innerHTML = document.getElementById("rock").innerHTML;
    displayUserChoice.classList.add("rock");
  }
}

function computerButton() {
  document.getElementById("computer-choice").classList.add("btn-circle");
  if (computerChoice == "paper") {
    displayComputerChoice.innerHTML = document.getElementById(
      "paper"
    ).innerHTML;
    displayComputerChoice.classList.add("paper");
  } else if (computerChoice == "scissors") {
    displayComputerChoice.innerHTML = document.getElementById(
      "scissors"
    ).innerHTML;
    displayComputerChoice.classList.add("scissors");
  } else {
    displayComputerChoice.innerHTML = document.getElementById("rock").innerHTML;
    displayComputerChoice.classList.add("rock");
  }
}

function resetGame() {
  displayUserChoice.classList = "btn-circle";
  displayComputerChoice.classList = "btn-circle";
  stepOne.style.display = "none";
  stepThree.style.visibility = "hidden";
  stepFour.style.display = "none";
}

function compare() {
  if (userChoice == computerChoice) {
    message = "tie";
  } else if (userChoice == "rock") {
    if (computerChoice == "scissors") {
      message = "you win";
    } else {
      message = "you lose";
    }
  } else if (userChoice == "paper") {
    if (computerChoice == "rock") {
      message = "you win";
    } else {
      message = "you lose";
    }
  } else if (userChoice == "scissors") {
    if (computerChoice == "paper") {
      message = "you win";
    } else {
      message = "you lose";
    }
  }

  console.log(computerChoice);
  console.log(message);
  return message;
}

function getStepTwo() {
  stepTwo.style.display = "flex";

  userButton();
}

function getStepThree() {
  computerButton();
  stepThree.style.visibility = "visible";
}

function getStepFour(userChoice, computerChoice) {
  let selection = document.getElementById("selection");
  compare(userChoice, computerChoice);
  if (message == "you win") {
    // displayUserChoice.classList.add("btn-winner");
    userScore += 1;
  } else if (message == "you lose") {
    // displayComputerChoice.classList.add("btn-winner");
    userScore -= 1;
  }
  document.getElementById("score").innerHTML = userScore;
  document.getElementById("message").innerHTML = message;

  selection.style.justifyContent = "space-between";
  selection.style.width = "1000px";
  stepFour.style.display = "inline";
}
