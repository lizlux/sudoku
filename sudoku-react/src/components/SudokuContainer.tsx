import { RefObject, useRef, useState } from "react";
import getLines from "../helpers/getSudokuGrid";
import { ValidNumber } from "../types/sudoku-types";
import { getHidden } from "../helpers/setUpGame";

function SudokuContainer({
  lines,
  hiddenGrid,
}: {
  lines: ValidNumber[][];
  hiddenGrid: boolean[][];
}) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<ValidNumber | null>(
    null
  );
  const [selectedColIndex, setSelectedColIndex] = useState<ValidNumber | null>(
    null
  );

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
