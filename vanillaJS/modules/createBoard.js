import { getRandomNumber } from "./utils.js";
import { keyCodeMap } from "./constants.js";

const getHidden = () => {
  const hiddenCount = 20; // TODO: make this dynamic based on easy / medium / hard
  const hiddenGrid = new Array(9).fill(new Array(9).fill(false));
  for (let i = 0; i < hiddenCount; i++) {
    const rowIndex = getRandomNumber() - 1;
    const colIndex = getRandomNumber() - 1;
    const rowToReplace = [...hiddenGrid[rowIndex]];
    rowToReplace.splice(colIndex, 1, true);
    hiddenGrid.splice(rowIndex, 1, rowToReplace);
  }
  return hiddenGrid;
};

const getContainer = (lines) => {
  const container = document.createElement("div");
  const hiddenMap = getHidden();
  container.className = "container";

  lines.forEach((line, lineIndex) => {
    line.forEach((value, valueIndex) => {
      const square = document.createElement("div");
      square.classList.add("square");
      if (hiddenMap[lineIndex][valueIndex] === true) {
        square.classList.add("hidden");
        initSquareInput(square);
      }
      const span = document.createElement("span");
      span.innerText = value;
      square.appendChild(span);
      container.appendChild(square);
    });
  });
  return container;
};

let selectedSquare = null;

const checkIfComplete = () => {
  let isComplete = true;
  document.querySelectorAll(".square").forEach((square) => {
    if (square.classList.contains("hidden")) {
      isComplete = false;
    }
  });
  return isComplete;
};

const showFeedback = (square, className) => {
  square.classList.add(className);
  setTimeout(() => {
    square.classList.remove(className);
  }, 500);
};

const keyDownHandler = (keyDownEvent) => {
  const code = keyDownEvent.keyCode;
  const value = selectedSquare.querySelector("span").innerHTML;
  if (keyCodeMap[code]) {
    if (Number(value) === keyCodeMap[code]) {
      selectedSquare.classList.remove("hidden");
      showFeedback(selectedSquare, "success");
      const isComplete = checkIfComplete();
      if (isComplete) {
        setTimeout(() => alert("You did it! 🎉"), 0);
      }
    } else {
      showFeedback(selectedSquare, "error");
    }
  }
};

const initSquareInput = (square) => {
  square.addEventListener("click", () => {
    if (!selectedSquare) {
      document.addEventListener("keydown", keyDownHandler);
    }
    if (square === selectedSquare) {
      return;
    }
    selectedSquare?.classList.remove("selected");
    selectedSquare = square;
    square.classList.add("selected");
  });
};

const createBoard = (lines) => {
  const board = document.querySelector("#sudoku-board");
  board.appendChild(getContainer(lines));
};

export default createBoard;
