import {
  fireEvent,
  Queries,
  render,
  Screen,
  screen,
} from "@testing-library/react";
import App from "./App";

test("renders Welcome to Sudoku React header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to Sudoku/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders the whole board", () => {
  render(<App />);
  const easyButton = screen.getByRole("button", { name: "Easy" });
  fireEvent.click(easyButton);

  const squares = screen.getAllByTestId("sudoku-square");
  expect(squares.length).toBe(81);
});

test("correct number of hidden square values", () => {
  const getBlanks = () => {
    const spans = screen.getAllByTestId("sudoku-span");
    const blanks = spans.reduce((acc: HTMLElement[], curr: HTMLElement) => {
      if (curr.textContent?.trim() === "") {
        acc.push(curr);
      }
      return acc;
    }, []);
    return blanks;
  };

  render(<App />);
  const easyButton = screen.getByRole("button", { name: "Easy" });

  let blanks;
  let backButton;

  fireEvent.click(easyButton);
  blanks = getBlanks();
  expect(blanks.length).toBe(30);

  backButton = screen.getByRole("button", { name: "Back" });
  fireEvent.click(backButton);
  const mediumButton = screen.getByRole("button", { name: "Medium" });
  fireEvent.click(mediumButton);
  blanks = getBlanks();
  expect(blanks.length).toBe(40);

  backButton = screen.getByRole("button", { name: "Back" });
  fireEvent.click(backButton);
  const hardButton = screen.getByRole("button", { name: "Hard" });
  fireEvent.click(hardButton);
  blanks = getBlanks();
  expect(blanks.length).toBe(50);
});
