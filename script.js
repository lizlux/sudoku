// Let's build a sudoku board!

const getRandomLine = () => {
  const sampleLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return [...sampleLine].sort(() => Math.random() - 0.5);
};

const areValuesUnique = (currLine, prevLine) => {
  let valuesAreUnique = true;
  currLine.forEach((value, index) => {
    if (currLine[index] === prevLine[index]) {
      valuesAreUnique = false;
    }
  });
  return valuesAreUnique;
};

const isUniqueToRow = (num, line) => {
  return !line.includes(num);
};

const isUniqueToColumn = (num, lines, line) => {
  const i = line.length;
  return lines.every((ln) => {
    return ln[i] !== num;
  });
};

const getBox = (lines, line) => {
  const column = line.length;
  const row = lines.length;
  let box = 0;

  if (row < 3) {
    if (column < 3) {
      box = 1;
    } else if (column < 6) {
      box = 2;
    } else {
      box = 3;
    }
  } else if (row < 6) {
    if (column < 3) {
      box = 4;
    } else if (column < 6) {
      box = 5;
    } else {
      box = 6;
    }
  } else {
    if (column < 3) {
      box = 7;
    } else if (column < 6) {
      box = 8;
    } else {
      box = 9;
    }
  }
  return box;
};

const getBoxValues = (box, lines, line) => {
  const values = [];
  const wipLines = [...lines, line];
  let rowStart;
  let rowEnd;
  let colStart;
  let colEnd;

  if (box <= 3) {
    rowStart = 0;
    rowEnd = 3;
  } else if (box <= 6) {
    rowStart = 3;
    rowEnd = 6;
  } else {
    rowStart = 6;
    rowEnd = 9;
  }

  if (box === 1 || box === 4 || box === 7) {
    colStart = 0;
    colEnd = 3;
  } else if (box === 2 || box === 5 || box === 8) {
    colStart = 3;
    colEnd = 6;
  } else {
    colStart = 6;
    colEnd = 9;
  }

  for (let row = rowStart; row < rowEnd; row++) {
    for (let col = colStart; col < colEnd; col++) {
      if (wipLines[row] && wipLines[row][col]) {
        values.push(wipLines[row][col]);
      }
    }
  }

  return values;
};

const isUniqueToBox = (num, lines, line) => {
  const box = getBox(lines, line);
  const boxValues = getBoxValues(box, lines, line);
  return !boxValues.includes(num);
};

const getNextLine = (lines) => {
  const lineLength = 9;
  let line = [];
  let count = 0;
  while (!line.length && count < 500) {
    line = tryToGetNextLine(lineLength, lines);
    count++;
  }
  if (line.length !== lineLength) {
    // TODO: put helpful message in the UX
    throw "Couldn't get the next line with 500 tries";
  }
  return line;
};

const tryToGetNextLine = (lineLength, lines) => {
  const line = [];
  for (let i = 0; i < lineLength; i++) {
    const nextNum = getNextNumber(lines, line);
    if (nextNum) {
      line.push(getNextNumber(lines, line));
    }
  }
  if (line.length === lineLength) {
    return line;
  }
  return [];
};

const getNextNumber = (lines, line) => {
  let isUnique = false;
  let count = 0;
  let num = getRandomNumber();
  while (!isUnique && count < 9) {
    num = addOne(num);
    isUnique =
      isUniqueToRow(num, line) &&
      isUniqueToColumn(num, lines, line) &&
      isUniqueToBox(num, lines, line);
    count++;
  }
  if (isUnique) {
    return num;
  }
  return 0;
};

const addOne = (num) => {
  if (num === 9) {
    return 1;
  }
  return num + 1;
};

const getRandomNumber = () => {
  return Math.ceil(Math.random() * 9);
};

const getLines = () => {
  const lines = [getRandomLine()];
  for (let i = 0; i < 8; i++) {
    lines.push(getNextLine(lines));
  }
  return lines;
};

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

// note: this isn't always accurate depending on the keyboard
const keyCodeMap = {
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
  97: 2,
  98: 3,
  99: 4,
  100: 5,
  101: 6,
  102: 7,
  103: 8,
  105: 9,
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

const keyDownHandler = (keyDownEvent) => {
  const code = keyDownEvent.keyCode;
  const value = selectedSquare.querySelector("span").innerHTML;
  if (keyCodeMap[code]) {
    if (Number(value) === keyCodeMap[code]) {
      selectedSquare.classList.remove("hidden");
      const isComplete = checkIfComplete();
      if (isComplete) {
        alert("You did it! 🎉");
      }
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

// Execute the code
const allLines = getLines();
createBoard(allLines);

// Run tests
const testLines = (lines) => {
  const testUnique = (arr) => {
    const used = [];
    let pass = true;
    arr.forEach((item) => {
      if (used.includes(item)) {
        console.error("Some items are not unique", arr);
        pass = false;
      }
      used.push(item);
    });
    return pass;
  };

  const testRows = (lines) => {
    let pass = true;
    lines.forEach((row) => {
      if (!testUnique(row)) {
        pass = false;
      }
    });
    return pass;
  };

  const testColumns = (lines) => {
    const columns = [];
    for (let i = 0; i < lines.length; i++) {
      const column = [];
      lines.forEach((line) => {
        column.push(line[i]);
      });
      columns.push(column);
    }

    let pass = true;
    columns.forEach((column) => {
      if (!testUnique(column)) {
        pass = false;
      }
    });
    return pass;
  };

  // TODO: add tests for boxes
  const testBoxes = (lines) => {};

  const testBox = (box) => {};

  let pass = true;
  pass = testRows(lines) && testColumns(lines);
  if (pass) {
    console.log("All tests pass");
  } else {
    console.error("Some tests failed");
  }
};

// Uncomment next line to run tests
// testLines(allLines);
