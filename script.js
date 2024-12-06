"use strict";

// === DOM References ===

const container = document.querySelector(".container");
const generateNewGridBtn = document.querySelector(".generate-new-grid-button");
const modificationButtonsContainer = document.querySelector(
  ".modification-buttons-container"
);

// === Event Handlers ===

document.addEventListener("DOMContentLoaded", () => {
  createSquares();
});

generateNewGridBtn.addEventListener("click", () => {
  handleNewGrid();
});

// Adds the default event handler
let currentHandler = makeSquaresBlack;

modificationButtonsContainer.addEventListener("click", (e) => {
  const buttonClicked = e.target.id;

  // Ensure the clicked element is a valid button with a handler
  if (
    buttonClicked === "random-color-button" &&
    currentHandler !== randomizeSquareColors
  ) {
    container.removeEventListener("mouseover", currentHandler);
    currentHandler = randomizeSquareColors;
    container.addEventListener("mouseover", currentHandler);
  } else if (
    buttonClicked === "darken-color-button" &&
    currentHandler !== darkenSquaresColors
  ) {
    container.removeEventListener("mouseover", currentHandler);
    currentHandler = darkenSquaresColors;
    container.addEventListener("mouseover", currentHandler);
  }
});

container.addEventListener("mouseover", currentHandler);

// === Functions Or Helper Functions ===

// Creates 16x16 without argument (uses a default parameter)
function createSquares(sqr = 16) {
  let totalSquares = sqr * sqr;

  for (let i = 0; i < totalSquares; i++) {
    const div = document.createElement("div");

    div.classList = "square";

    div.style.cssText = `width: calc(100% / ${sqr}); height: calc(100% / ${sqr}); `;

    container.appendChild(div);
  }
}

// Gets data to create new grid from user
function handleNewGrid() {
  let squaresPerSide;

  // Prompt the user untill valid input is provided
  do {
    squaresPerSide = prompt(
      "How many squares per side? (Enter a number between 1 and 100)"
    );

    // exit when cancel button or an empty string is entered
    if (squaresPerSide === null || squaresPerSide.trim() === "") return;

    squaresPerSide = +squaresPerSide; // Convert to a number

    if (isNaN(squaresPerSide) || squaresPerSide < 1 || squaresPerSide > 100) {
      alert("Invalid input! Please enter a number between 1 and 100.");
    }
  } while (isNaN(squaresPerSide) || squaresPerSide < 1 || squaresPerSide > 100);

  clearContainer();

  createSquares(squaresPerSide);
}

// Clears grid when called
function clearContainer() {
  const allSquares = getAllSquares();
  allSquares.forEach((square) => {
    square.remove();
  });
}

// Fetches the latest list of all square divs
function getAllSquares() {
  return document.querySelectorAll(".square");
}

// Generates random numbers from 0 to 225
function getRandomNum() {
  return Math.floor(Math.random() * 256);
}

// When called by an event listener dose what the name says
function makeSquaresBlack(e) {
  if (!e.target.classList.contains("square")) return;

  e.target.style.backgroundColor = "rgb(0, 0, 0)";
}

// When called by listener changes square colors randomly on interaction
function randomizeSquareColors(e) {
  if (!e.target.classList.contains("square")) return;

  e.target.style.backgroundColor = `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
}

// Darken square gradually when called by event handler
function darkenSquaresColors(e) {
  // Ensure the target is a square
  if (!e.target.classList.contains("square")) return;

  // Get the current background color
  let squareBackground = window.getComputedStyle(e.target).backgroundColor;

  // Check if the background is already rgba or not
  if (
    squareBackground === "rgba(0, 0, 0, 0)" ||
    squareBackground === "transparent"
  ) {
    // Start with black and 0.1 transparency
    e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  } else {
    // Extract the alpha value from rgba
    let alpha = parseFloat(
      squareBackground.slice(squareBackground.lastIndexOf(",") + 1, -1)
    );

    // Increase the alpha value by 0.1
    alpha = Math.min(alpha + 0.1, 1);

    // Set the new background color with the updated alpha
    e.target.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
  }
}
