// TODO: Rename non-react files to .ts from .tsx
import { addOne, getRandomLine, getRandomNumber } from "./numberUtils";
import {
  isUniqueToRow,
  isUniqueToColumn,
  isUniqueToBox,
} from "./lineValidators";
import { ValidNumber } from "../types/sudoku-types";

const getNextLine = (lines: ValidNumber[][]): ValidNumber[] => {
  const lineLength = 9;
  let line: ValidNumber[] = [];
  let count = 0;
  while (!line.length && count < 100) {
    line = tryToGetNextLine(lineLength, lines);
    count++;
  }
  // TODO: instead of throwing here, start whole board over
  if (line.length !== lineLength) {
    throw new Error("Couldn't get the next line with 100 tries");
  }
  return line;
};

const tryToGetNextLine = (
  lineLength: ValidNumber,
  lines: ValidNumber[][]
): ValidNumber[] => {
  const line: ValidNumber[] = [];
  for (let i = 0; i < lineLength; i++) {
    const nextNum = getNextNumber(lines, line);
    if (nextNum) {
      line.push(nextNum);
    }
  }
  if (line.length === lineLength) {
    return line;
  }
  return [];
};

const getNextNumber = (
  lines: ValidNumber[][],
  line: ValidNumber[]
): ValidNumber | null => {
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
  return null;
};

const difficultyMap = {
  1: 30,
  2: 40,
  3: 50,
};

export const getHidden = (difficultyLevel: 1 | 2 | 3): boolean[][] => {
  const hiddenCount: number = difficultyMap[difficultyLevel];
  const hiddenGrid = new Array(9).fill(new Array(9).fill(false));

  let tries = 0;
  const maxTries = 1000;
  const getUniqueXY = (): number[] => {
    if (tries < maxTries) {
      tries++;
      const rowIndex = getRandomNumber() - 1;
      const colIndex = getRandomNumber() - 1;
      if (hiddenGrid[rowIndex][colIndex] === true) {
        return getUniqueXY();
      }
      return [rowIndex, colIndex];
    } else {
      throw new Error(`Couldn't get the hidden grid after ${maxTries} tries`);
    }
  };
  for (let i = 0; i < hiddenCount; i++) {
    const [row, col] = getUniqueXY();
    const rowToReplace = [...hiddenGrid[row]];
    rowToReplace.splice(col, 1, true);
    hiddenGrid.splice(row, 1, rowToReplace);
  }
  return hiddenGrid;
};

let attempts = 0;
export const getLines = (): ValidNumber[][] => {
  attempts++;
  if (attempts < 100) {
    try {
      const lines = [getRandomLine()];
      for (let i = 0; i < 8; i++) {
        lines.push(getNextLine(lines));
      }
      return lines;
    } catch {
      console.log("Re-trying the sudoku board");
      return getLines();
    }
  } else {
    // TODO: handle this error in the UI
    throw new Error("Couldn't get the sudoku board with 100 tries");
  }
};
