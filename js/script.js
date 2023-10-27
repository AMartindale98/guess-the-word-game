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

updateText(word);

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
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
  // console.log(guessedLetters);
};

const showGuessedLetters = function () {
  ul.innerHTML = "";
  guessedLetters.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `${item}`;
    ul.append(li);
  });
};

const updateWordInProgress = function (guessedLetters) {
  //wordUpper suggestion that Skillcrush recommends does not work because the guessedLetter array contains only lowercase letters. Doesn't make sense to convert it to uppercase because in the comparison you would need to then convert it back to lowercase to ensure it matches.
  const wordArray = word.split("");
  console.log(wordArray);
  const revealWord = [];
  for (const singleLetter of wordArray) {
    if (guessedLetters.includes(singleLetter)) {
      revealWord.push(singleLetter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  console.log(revealWord);
  wordProgress.innerText = revealWord.join("");
  checkIfWon();
};

const checkIfWon = function () {
  if (wordProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML =
      "<p class='highlight'>You guessed correct the word! Congrats!</p>";
  }
};

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
