"use strict";
// == Global Variables ===
let gridSize = 16;
let isRandomActive = false;
let isDarkenColorOn = false;

// === DOM References ===

const container = document.querySelector(".container");
const gridSizedisplay = document.querySelector(".grid-size");
const generateNewGridBtn = document.querySelector(".generate-new-grid-button");
const randomColorBtn = document.getElementById("random-color-button");
const darkenColorBtn = document.getElementById("darken-color-button");

// === Event Handlers ===

// Event listener for creating default squares
document.addEventListener("DOMContentLoaded", () => {
  createSquares(gridSize);
});

// Event listener for Random Colors btn
randomColorBtn.addEventListener("click", () => {
  toggleRandomBtn();
});

// Event listener for Darken Color btn
darkenColorBtn.addEventListener("click", () => {
  toggleDarkenBtn();
});

// Event listener for generating new squares btn
generateNewGridBtn.addEventListener("click", () => {
  handleNewGrid();
});

// Event listener for squares container
container.addEventListener("mouseover", (e) => {
  if (isDarkenColorOn) {
    darkenSquaresColors(e);
  }
  if (isRandomActive) randomizeSquareColors(e);
  if (!isRandomActive && !isDarkenColorOn) makeSquaresBlack(e);
});

// === Functions Or Helper Functions ===

function createSquares(sqr) {
  let totalSquares = sqr ** 2;

  for (let i = 0; i < totalSquares; i++) {
    const div = document.createElement("div");

    div.classList = "square";

    div.style.cssText = `width: calc(100% / ${sqr}); height: calc(100% / ${sqr}); `;

    container.appendChild(div);
  }

  gridSize = sqr;
}

// Func for updating current grid display on HTML
function updateGridDisplay() {
  gridSizedisplay.textContent = `${gridSize}x${gridSize}`;
}

// Func for handling new grid
function handleNewGrid() {
  let squaresPerSide;

  do {
    squaresPerSide = prompt(
      "How many squares per side? (Enter a number between 1 and 100)"
    );

    if (squaresPerSide === null || squaresPerSide.trim() === "") return;

    squaresPerSide = +squaresPerSide; // Convert to a number

    if (isNaN(squaresPerSide) || squaresPerSide < 1 || squaresPerSide > 100) {
      alert("Invalid input! Please enter a number between 1 and 100.");
    }
  } while (isNaN(squaresPerSide) || squaresPerSide < 1 || squaresPerSide > 100);

  container.replaceChildren(); // clear the container

  createSquares(squaresPerSide);

  updateGridDisplay();
}

function getRandomNum() {
  return Math.floor(Math.random() * 256);
}

// Func for toggling darken btn ON and OFF
function toggleDarkenBtn() {
  // Disable random btn if ON
  if (isRandomActive) {
    toggleRandomBtn();
  }

  isDarkenColorOn = !isDarkenColorOn;
  darkenColorBtn.style.backgroundColor = isDarkenColorOn
    ? darkenColorBtn.classList.toggle("active")
    : darkenColorBtn.classList.toggle("active");
  darkenColorBtn.textContent = isDarkenColorOn
    ? "Darken Color: ON"
    : "Darken Color";

  removeFullBlackClass();
}

function removeFullBlackClass() {
  if (isDarkenColorOn === false) {
    document.querySelectorAll(".square").forEach((square) => {
      square.classList.remove("full-black");
    });
  }
}

// Func for toggling random colors btn ON and OFF
function toggleRandomBtn() {
  removeFullBlackClass();

  // Disable darken btn if ON
  if (isDarkenColorOn) {
    toggleDarkenBtn();
  }
  isRandomActive = !isRandomActive;
  randomColorBtn.style.backgroundColor = isRandomActive
    ? randomColorBtn.classList.toggle("active")
    : randomColorBtn.classList.toggle("active");
  randomColorBtn.textContent = isRandomActive
    ? "Random Colors: ON"
    : "Random Colors";
}

// Handler func for the default black
function makeSquaresBlack(e) {
  if (!e.target.classList.contains("square")) return;

  e.target.style.backgroundColor = "rgb(0, 0, 0)";
}
// Handler func for generating random colours
function randomizeSquareColors(e) {
  if (!e.target.classList.contains("square")) return;

  e.target.style.backgroundColor = `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
}

function darkenSquaresColors(e) {
  let squareBackground = window.getComputedStyle(e.target).backgroundColor;
  let alphaValue;
  if (e.target.classList.contains("full-black")) return; // Check if completely back

  if (squareBackground !== "rgba(0, 0, 0, 0)") {
    e.target.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }

  alphaValue = squareBackground.slice(
    squareBackground.lastIndexOf(",") + 2,
    -1
  ); // Extract alpha value

  alphaValue = parseFloat(alphaValue) + 0.1; // Convert to decimal and add 0.1

  if (alphaValue === 1) e.target.classList.toggle("full-black"); // Add marker if completely black

  e.target.style.backgroundColor = `rgba(0, 0, 0, ${alphaValue})`;

  window.getComputedStyle(e.target).backgroundColor;
}
