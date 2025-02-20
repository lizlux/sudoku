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
  while (!line.length && count < 100) {
    line = tryToGetNextLine(lineLength, lines);
  }
  if (line.length !== lineLength) {
    throw "Couldn't get the next line with 100 tries";
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

const createContainer = (lines) => {
  const board = document.querySelector("#sudoku-board");
  const container = document.createElement("div");
  container.className = "container";

  lines.forEach((line) => {
    line.forEach((value) => {
      const square = document.createElement("div");
      square.className = "square";
      square.innerText = value;
      container.appendChild(square);
    });
  });
  board.appendChild(container);
};

// Execute the code
const allLines = getLines();
createContainer(allLines);

// tests

const testLines = (lines) => {
  let pass = true;
  pass = testRows(lines);
  if (pass) {
    console.log("All tests pass");
  } else {
    console.error("Some tests failed");
  }
};

const testRows = (lines) => {
  let pass = true;
  lines.forEach((row) => {
    if (!testRow(row)) {
      pass = false;
    }
  });
  return pass;
};

const testRow = (row) => {
  const used = [];
  let pass = true;
  row.forEach((item) => {
    if (used.includes(item)) {
      console.error("Row items are not unique", row);
      pass = false;
    }
    used.push(item);
  });
  return pass;
};

const testColumns = (lines) => {};
const testColumn = (column) => {};

const testBoxes = (lines) => {};

const testBox = (box) => {};

testLines(allLines);
