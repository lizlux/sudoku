import { ReactNode } from "react";
import getLines from "./helpers/getSudokuGrid";
import { ValidNumber } from "./types/sudoku-types";

function SudokuContainer() {
  const lines: ValidNumber[][] = getLines();

  return (
    <div className="container">
      {lines.map((line) =>
        line.map((square, index) => (
          <div className="square" key={index}>
            <span>{square}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default SudokuContainer;
