"use strict";
// == Global Variables ===
let gridSize = 16;
let isRandomActive = false;
let isDarkenColorOn = false;

// === DOM References ===

const container = document.querySelector(".container");
const gridSizedisplay = document.querySelector(".grid-size");
const generateNewGridBtn = document.querySelector(".generate-new-grid-button");
const modificationButtonsContainer = document.querySelector(
  ".modification-buttons-container"
);
const randomColorBtn = modificationButtonsContainer.children[0];
const darkenColorBtn = modificationButtonsContainer.children[1];

// === Event Handlers ===
darkenColorBtn.addEventListener("click", () => {
  toggleDarkenBtn();
});

randomColorBtn.addEventListener("click", () => {
  toggleRandomBtn();
});

document.addEventListener("DOMContentLoaded", () => {
  createSquares(gridSize);
});

generateNewGridBtn.addEventListener("click", () => {
  handleNewGrid();
});

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

function updatedGridDisplay() {
  gridSizedisplay.textContent = `${gridSize}x${gridSize}`;
}

// Gets data to create new grid from user
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

  container.replaceChildren();

  createSquares(squaresPerSide);

  updatedGridDisplay();
}

function getRandomNum() {
  return Math.floor(Math.random() * 256);
}

function toggleDarkenBtn() {
  if (isRandomActive) {
    toggleRandomBtn();
  }

  isDarkenColorOn = !isDarkenColorOn;
  darkenColorBtn.style.backgroundColor = isDarkenColorOn
    ? "rgb(252, 209, 171)"
    : "rgb(255, 255, 255)";
  darkenColorBtn.textContent = isDarkenColorOn
    ? "Darken Color: ON"
    : "Darken Color";

  if (isDarkenColorOn) {
    container.replaceChildren();
    createSquares(gridSize);
  }
}

function toggleRandomBtn() {
  if (isDarkenColorOn) {
    toggleDarkenBtn();
  }
  isRandomActive = !isRandomActive;
  randomColorBtn.style.backgroundColor = isRandomActive
    ? "rgb(252, 209, 171)"
    : "rgb(255, 255, 255)";
  randomColorBtn.textContent = isRandomActive
    ? "Random Colors: ON"
    : "Random Colors";
}

function makeSquaresBlack(e) {
  if (!e.target.classList.contains("square")) return;

  e.target.style.backgroundColor = "rgb(0, 0, 0)";
}

function randomizeSquareColors(e) {
  if (!e.target.classList.contains("square")) return;

  e.target.style.backgroundColor = `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
}

function darkenSquaresColors(e) {
  let squareBackground = window.getComputedStyle(e.target).backgroundColor;

  if (squareBackground === "rgb(0, 0, 0)") return;
  let alphaValue = squareBackground.slice(
    squareBackground.lastIndexOf(",") + 2,
    -1
  );

  alphaValue = parseFloat(alphaValue) + 0.1;
  console.log(alphaValue);
  alphaValue = Math.round(alphaValue * 10) / 10;

  e.target.style.backgroundColor = `rgba(0, 0, 0, ${alphaValue})`;
  console.log(alphaValue);

  console.log(window.getComputedStyle(e.target).backgroundColor);
}
