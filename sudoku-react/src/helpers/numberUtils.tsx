import { ValidNumber } from "../types/sudoku-types";

export const addOne = (num: ValidNumber): ValidNumber => {
  if (num === 9) {
    return 1;
  }
  return (num + 1) as ValidNumber;
};

export const getRandomLine = () => {
  const sampleLine: ValidNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return [...sampleLine].sort(() => Math.random() - 0.5);
};

export const getRandomNumber = (): ValidNumber => {
  return Math.ceil(Math.random() * 9) as ValidNumber;
};
