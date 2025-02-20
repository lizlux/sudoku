// alert("ready");

const getRandomLine = () => {
  const sampleLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return [...sampleLine].sort(() => Math.random() - 0.5);
};

// const getNextLine = (prevLines) => {
//   let newLine;
//   let count = 0;
//   let areUnique;

//   while (!areUnique && count < 100) {
//     count++;
//     console.log(count);
//     newLine = getRandomLine();
//     areUnique = prevLines.every((prevLine) => {
//       return areValuesUnique(newLine, prevLine);
//     });
//   }
//   console.log(areUnique);
//   return newLine;
// };

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
  console.log("wipLines", wipLines);
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
  console.log("box", box);
  console.log("box values", boxValues);
  return !boxValues.includes(num);
};

const getNextLine = (lines) => {
  // console.log("getNextLine");
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
    console.log(">>>>>>>> got the line", lines.length);
    return line;
  }
  console.log(">>>>>>>> try line again", lines.length);
  return [];
};

const getNextNumber = (lines, line) => {
  // console.log("getNextNumber");
  let isUnique = false;
  let count = 0;
  let num = getRandomNumber();
  while (!isUnique && count < 9) {
    // console.log("count", count);
    num = addOne(num);
    // console.log("num", num);
    isUnique =
      isUniqueToRow(num, line) &&
      isUniqueToColumn(num, lines, line) &&
      isUniqueToBox(num, lines, line);
    count++;
    // if (isUnique) {
    //   console.log(">>> isUnique", lines.length);
    // }
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

const lines = getLines();
console.log(lines);
createContainer(lines);

// const getLines = () => {
//   const lines = [];
//   const sampleLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//   for (let row = 0; row < 9; row++) {
//     if (row === 0) {
//       lines.push(getRandomLine());
//     } else {
//       const nextLine = getNextLine(lines);
//       console.log(">>>>>");
//       lines.push(nextLine);
//     }
//   }

//   console.log(lines);
//   return lines;
// };

// const getLines = () => {
//   const lines = [];

//   // create the values in the squares
//   const sampleLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//   for (let row = 0; row < 2; row++) {
//     let line;
//     const randomLine = [...sampleLine].sort(() => Math.random() - 0.5);
//     if (row === 0) {
//       line = randomLine;
//     } else {
//       line = [];
//       const unused = [...randomLine];
//       unused.forEach((value) => {
//         console.log("value", value);
//         for (i = 0; i < row; i++) {
//           // check if the unused value is the same as any of the ones above it
//           // the ones above it are the values at the same index of the line we're on for each of the lines
//           if (value === lines[row - 1][line.length]) {
//             unused.push(value);
//           } else {
//             line.push(value);
//           }
//         }
//       });
//     }
//     lines.push(line);
//   }

//   console.log(lines);
//   return lines;
// };

// let sortIndex = 0;
// let rowProgress = 0;
// line.sort((a, b) => {
//   for (rowProgress < row; rowProgress++; ) {
//     console.log("b", b);
//     console.log("rowProgress", rowProgress);
//     console.log("lines[rowProgress]", lines[rowProgress]);
//     if (b === row[rowProgress]) {
//       return 1;
//     }
//     return -1;
//   }
//   sortIndex++;
// });
