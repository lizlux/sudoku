import { BoxPosition, ValidNumber } from "../types/sudoku-types";

export const isUniqueToRow = (
  num: ValidNumber,
  line: ValidNumber[]
): boolean => {
  return !line.includes(num);
};

export const isUniqueToColumn = (
  num: ValidNumber,
  lines: ValidNumber[][],
  line: ValidNumber[]
): boolean => {
  const i = line.length;
  return lines.every((ln) => {
    return ln[i] !== num;
  });
};

const getBox = (lines: ValidNumber[][], line: ValidNumber[]): BoxPosition => {
  const column = line.length;
  const row = lines.length;
  let box: BoxPosition;

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

const getBoxValues = (
  box: BoxPosition,
  lines: ValidNumber[][],
  line: ValidNumber[]
): ValidNumber[] => {
  const values: ValidNumber[] = [];
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

export const isUniqueToBox = (
  num: ValidNumber,
  lines: ValidNumber[][],
  line: ValidNumber[]
): boolean => {
  const box: BoxPosition = getBox(lines, line);
  const boxValues = getBoxValues(box, lines, line);
  return !boxValues.includes(num);
};
