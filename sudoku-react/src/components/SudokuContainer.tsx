import { RefObject, useRef, useState } from "react";
import getLines from "../helpers/getSudokuGrid";
import { ValidNumber } from "../types/sudoku-types";
import { getHidden } from "../helpers/setUpGame";

function SudokuContainer({ difficultyLevel }: { difficultyLevel: 1 | 2 | 3 }) {
  const lines: RefObject<ValidNumber[][] | null> = useRef(null);
  if (!lines.current) {
    lines.current = getLines();
  }

  const hiddenGrid: RefObject<boolean[][] | null> = useRef(null);
  if (!hiddenGrid.current) {
    hiddenGrid.current = getHidden(difficultyLevel);
  }

  const [selectedRowIndex, setSelectedRowIndex] = useState<ValidNumber | null>(
    null
  );
  const [selectedColIndex, setSelectedColIndex] = useState<ValidNumber | null>(
    null
  );

  const handleClick = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    setSelectedRowIndex(rowIndex);
    setSelectedColIndex(colIndex);
  };

  const isSelected = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    return rowIndex === selectedRowIndex && colIndex === selectedColIndex;
  };

  const isHidden = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    return (
      hiddenGrid.current && hiddenGrid.current[rowIndex][colIndex] === true
    );
  };

  const getSquareClassName = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    return `square ${
      isSelected(rowIndex as ValidNumber, colIndex as ValidNumber)
        ? "selected"
        : null
    } ${
      isHidden(rowIndex as ValidNumber, colIndex as ValidNumber)
        ? "hidden"
        : null
    }`;
  };

  return (
    <div className="container">
      {lines.current.map((line, rowIndex) =>
        line.map((square, colIndex) => (
          <div
            className={getSquareClassName(
              rowIndex as ValidNumber,
              colIndex as ValidNumber
            )}
            key={`${rowIndex}${colIndex}`}
            onClick={() =>
              handleClick(rowIndex as ValidNumber, colIndex as ValidNumber)
            }
          >
            <span>{square}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default SudokuContainer;
