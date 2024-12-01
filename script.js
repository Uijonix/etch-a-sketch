let colors = ["red", "blue", "yellow", "green", "orange", "violet"];

const container = document.querySelector(".container");
const setSquaresButton = document.querySelector(".set-squares-button");



createSquares();

function createSquares(numOfSquares = 16 * 16) {
  for (let i = 0; i < numOfSquares; i++) {
    const div = document.createElement("div");
    div.classList = "square";

    div.addEventListener(
      "mouseover",
      () => {
        div.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
      },
      { once: true }
    );

    container.appendChild(div);
  }
}