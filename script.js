// Let's build a sudoku board!

import testLines from "./modules/tests.js";
import getLines from "./modules/getLines.js";
import createBoard from "./modules/createBoard.js";

try {
  const allLines = getLines();
  createBoard(allLines);
} catch (e) {
  console.log(e);
  document.querySelector(".error-message").classList.remove("hidden");
}

// TODO: move test execution elsewhere
const runTests = () => {
  const allLines = getLines();
  createBoard(allLines);
  testLines(allLines);
};

// Uncomment next line to run tests
// runTests();
