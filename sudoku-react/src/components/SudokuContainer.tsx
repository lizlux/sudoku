import { useEffect } from "react";
import { ValidNumber } from "../types/sudoku-types";

function SudokuContainer({
  lines,
  hiddenGrid,
  selectedRowIndex,
  selectedColIndex,
  setSelectedColIndex,
  setSelectedRowIndex,
}: {
  lines: ValidNumber[][];
  hiddenGrid: boolean[][];
  selectedRowIndex: ValidNumber | null;
  selectedColIndex: ValidNumber | null;
  setSelectedColIndex: (number: ValidNumber) => void;
  setSelectedRowIndex: (number: ValidNumber) => void;
}) {
  const handleClick = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    if (isHidden(rowIndex, colIndex)) {
      setSelectedRowIndex(rowIndex);
      setSelectedColIndex(colIndex);
    }
  };

  const isSelected = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    return rowIndex === selectedRowIndex && colIndex === selectedColIndex;
  };

  const isHidden = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    return hiddenGrid && hiddenGrid[rowIndex][colIndex] === true;
  };

  const getSquareClassName = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    return `square ${
      isSelected(rowIndex as ValidNumber, colIndex as ValidNumber)
        ? "selected "
        : ""
    }${
      isHidden(rowIndex as ValidNumber, colIndex as ValidNumber) ? "hidden" : ""
    }`;
  };

  return (
    <div className="container">
      {lines.map((line, rowIndex) =>
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
            <span>
              {isHidden(rowIndex as ValidNumber, colIndex as ValidNumber)
                ? ""
                : square}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default SudokuContainer;
