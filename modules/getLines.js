import { addOne, getRandomLine, getRandomNumber } from "./utils.js";
import {
  isUniqueToRow,
  isUniqueToColumn,
  isUniqueToBox,
} from "./validators.js";

const getNextLine = (lines) => {
  const lineLength = 9;
  let line = [];
  let count = 0;
  while (!line.length && count < 500) {
    line = tryToGetNextLine(lineLength, lines);
    count++;
  }
  // TODO: instead of throwing here, start whole board over
  if (line.length !== lineLength) {
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

const getLines = () => {
  const lines = [getRandomLine()];
  for (let i = 0; i < 8; i++) {
    lines.push(getNextLine(lines));
  }
  return lines;
};

export default getLines;
