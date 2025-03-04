import { getRandomNumber } from "./numberUtils";

const difficultyMap = {
  1: 3,
  2: 50,
  3: 70,
};

export const getHidden = (difficultyLevel: 1 | 2 | 3): boolean[][] => {
  const hiddenCount: number = difficultyMap[difficultyLevel];
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
