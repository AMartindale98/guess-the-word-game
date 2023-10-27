const ul = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const playAgainButton = document.querySelector(".play-again");
const message = document.querySelector(".message");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const data = await res.text();
  const wordArray = data.split("\n");
  console.log(wordArray);
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  const randomWord = wordArray[randomIndex];
  word = randomWord.trim();
  updateText(word);
};

const updateText = function (placeholder) {
  console.log(placeholder);
  const str = placeholder
    .split("")
    .map((letter) => (letter = "●"))
    .join("");
  wordProgress.innerText = str;
};

getWord();

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
    countGuessesRemaining(letter);
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

const countGuessesRemaining = function (guess) {
  word.toUpperCase();
  if (word.includes(guess)) {
    message.innerText = `${guess} is in the mystery word!`;
  } else {
    message.innerText = `${guess} is not in the mystery word :(`;
    remainingGuesses -= 1;
  }
  if (remainingGuesses === 0) {
    message.innerText = `Game over! The word was '${word}'`;
    startOver();
  } else if (remainingGuesses === 1) {
    span.innerText = "1 guess";
  } else {
    span.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWon = function () {
  if (wordProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML =
      "<p class='highlight'>You guessed correct the word! Congrats!</p>";
    startOver();
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

const startOver = function () {
  guessButton.classList.add("hide");
  remaining.classList.add("hide");
  ul.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  ul.innerText = "";
  remainingGuesses = 8;
  span.innerText = `${remainingGuesses} guesses`;
  guessedLetters = [];
  guessButton.classList.remove("hide");
  remaining.classList.remove("hide");
  ul.classList.remove("hide");
  getWord();
  playAgainButton.classList.add("hide");
});
