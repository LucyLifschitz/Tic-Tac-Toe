"use strict";

const game = {
  xTurn: true,
  xState: [],
  oState: [],
  winningStates: [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};

document.addEventListener("click", (e) => {
  const target = e.target;
  const cell = target.classList.contains("cell");
  const disabled = target.classList.contains("disabled");

  if (cell && !disabled) {
    const cellValue = target.dataset.value;
    game.xTurn === true
      ? game.xState.push(cellValue)
      : game.oState.push(cellValue);

    target.classList.add("disabled");
    target.classList.add(game.xTurn ? "x" : "o");
    game.xTurn = !game.xTurn;
  }

  //Check for draw

  if (!document.querySelectorAll(".cell:not(.disabled)").length) {
    document.querySelector(".game-over").classList.add("visible");
    document.querySelector(".game-over-text").textContent = "Draw!";
  }

  //Check for win
  game.winningStates.forEach((winState) => {
    const xWins = winState.every((state) => game.xState.includes(state));
    const oWins = winState.every((state) => game.oState.includes(state));

    if (xWins || oWins) {
      document
        .querySelectorAll(".cell")
        .forEach((cell) => cell.classList.add(".disabled"));
      document.querySelector(".game-over").classList.add("visible");
      document.querySelector(".game-over-text").textContent = xWins
        ? "X wins!"
        : "O wins!";
    }
  });
});

//Restarting the game
document.querySelector(".game-restart").addEventListener("click", () => {
  document.querySelector(".game-over").classList.remove("visible");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("disabled", "x", "o");
  });
  game.xTurn = true;
  game.xState = [];
  game.oState = [];
});
