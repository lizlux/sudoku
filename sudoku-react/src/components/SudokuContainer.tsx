import { ValidNumber } from "../types/sudoku-types";

function SudokuContainer({
  lines,
  hiddenGrid,
  selectedXY,
  setSelectedXY,
  successXY,
  failXY,
}: {
  lines: ValidNumber[][];
  hiddenGrid: boolean[][];
  selectedXY: ValidNumber[] | null;
  setSelectedXY: (values: ValidNumber[]) => void;
  successXY: ValidNumber[] | null;
  failXY: ValidNumber[] | null;
}) {
  const handleClick = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    if (isHidden(rowIndex, colIndex)) {
      setSelectedXY([rowIndex, colIndex]);
    }
  };

  const isSelected = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    return (
      selectedXY && rowIndex === selectedXY[0] && colIndex === selectedXY[1]
    );
  };

  const isFail = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    return failXY && rowIndex === failXY[0] && colIndex === failXY[1];
  };

  const isSuccess = (rowIndex: ValidNumber, colIndex: ValidNumber) => {
    return successXY && rowIndex === successXY[0] && colIndex === successXY[1];
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
      isHidden(rowIndex as ValidNumber, colIndex as ValidNumber)
        ? "hidden "
        : ""
    }${
      isFail(rowIndex as ValidNumber, colIndex as ValidNumber) ? "fail " : ""
    }${
      isSuccess(rowIndex as ValidNumber, colIndex as ValidNumber)
        ? "success "
        : ""
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
            data-testid="sudoku-square"
            key={`${rowIndex}${colIndex}`}
            onClick={() =>
              handleClick(rowIndex as ValidNumber, colIndex as ValidNumber)
            }
          >
            <span data-testid="sudoku-span">
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
