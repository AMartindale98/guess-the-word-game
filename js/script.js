const ul = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const displayedRemainingGuesses = document.querySelector("span");
const hiddenButton = document.querySelector(".play-again");
const message = document.querySelector(".message");
const word = "magnolia";
const guessedLetters = [];

const updateText = function (placeholder) {
  const str = placeholder
    .split("")
    .map((letter) => (letter = "●"))
    .join("");
  wordProgress.innerText = str;
};

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input === "") {
    message.innerText = "Please input one letter";
  } else if (input.length > 1) {
    message.innerText = "Too many letters! Please input only one letter";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "That is not a letter! Please input one letter";
  } else {
    return input;
  }
};

const makeGuess = function (letter) {
  letter.toUpperCase();
  if (guessedLetters.includes(letter)) {
    message.innerText = "You've already guessed that letter! Please try again";
  } else {
    guessedLetters.push(letter);
  }
  console.log(guessedLetters);
};

updateText(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = guessInput.value;
  //console.log(inputValue);
  guessInput.value = "";
  message.innerText = "";
  const userInput = validateInput(inputValue);
  //console.log(userInput);
  if (userInput !== undefined) {
    makeGuess(userInput);
  }
});
