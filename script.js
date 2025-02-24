// Let's build a sudoku board!

import testLines from "./modules/tests.js";
import getLines from "./modules/getLines.js";
import createBoard from "./modules/createBoard.js";

const handleError = () => {
  document.querySelector(".error-message").classList.remove("hidden");
};

// Execute the code
try {
  const allLines = getLines();
  createBoard(allLines);

  // Uncomment next line to run tests
  // testLines(allLines);
} catch (e) {
  console.log(e);
  handleError();
}
