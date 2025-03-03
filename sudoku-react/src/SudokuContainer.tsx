import { RefObject, useRef, useState } from "react";
import getLines from "./helpers/getSudokuGrid";
import { ValidNumber } from "./types/sudoku-types";

function SudokuContainer() {
  const lines: RefObject<ValidNumber[][]> = useRef(getLines());
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

  return (
    <div className="container">
      {lines.current.map((line, rowIndex) =>
        line.map((square, colIndex) => (
          <div
            className={`square ${
              isSelected(rowIndex as ValidNumber, colIndex as ValidNumber)
                ? "selected"
                : null
            }`}
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
