export const addOne = (num) => {
  if (num === 9) {
    return 1;
  }
  return num + 1;
};

export const getRandomLine = () => {
  const sampleLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return [...sampleLine].sort(() => Math.random() - 0.5);
};

export const getRandomNumber = () => {
  return Math.ceil(Math.random() * 9);
};
