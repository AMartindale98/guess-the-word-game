const ul = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const displayedRemainingGuesses = document.querySelector("span");
const hiddenButton = document.querySelector(".play-again");
const word = "magnolia";

const updateText = function (placeholder) {
  const str = placeholder
    .split("")
    .map((letter) => (letter = "●"))
    .join("");
  wordProgress.innerText = str;
};

updateText(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = guessInput.value;
  console.log(inputValue);
  guessInput.value = "";
});
