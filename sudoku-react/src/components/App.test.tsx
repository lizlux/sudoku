import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import SudokuContainer from "./SudokuContainer";

test("renders Welcome to Sudoku React header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to Sudoku React/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders the whole board", () => {
  render(<App />);
  const squares = screen.getAllByTestId("sudoku-square");
  expect(squares.length).toBe(81);
});

test("correct number of hidden square values", () => {
  render(<App />);
  const easyButton = screen.getByRole("button", { name: "Easy" });
  const mediumButton = screen.getByRole("button", { name: "Medium" });
  const hardButton = screen.getByRole("button", { name: "Hard" });
  let blanks;

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

  blanks = getBlanks();
  expect(blanks.length).toBe(30);

  fireEvent.click(mediumButton);
  blanks = getBlanks();
  expect(blanks.length).toBe(50);

  fireEvent.click(hardButton);
  blanks = getBlanks();
  expect(blanks.length).toBe(70);

  fireEvent.click(easyButton);
  blanks = getBlanks();
  expect(blanks.length).toBe(30);
});
