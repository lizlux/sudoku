import { useEffect, useState } from "react";
import "./App.css";
import DifficultyToggle from "./DifficultyToggle";
import SudokuContainer from "./SudokuContainer";
import { ValidNumber } from "../types/sudoku-types";
import { getLines, getHidden } from "../helpers/getSudokuGrid";

function App() {
  const [difficultyLevel, setDifficultyLevel] = useState<1 | 2 | 3>(1);
  const [lines, setLines] = useState<ValidNumber[][] | null>(null);
  const [hiddenGrid, setHiddenGrid] = useState<boolean[][] | null>(null);
  const [selectedXY, setSelectedXY] = useState<ValidNumber[] | null>(null);
  const [successXY, setSuccessXY] = useState<ValidNumber[] | null>(null);
  const [failXY, setFailXY] = useState<ValidNumber[] | null>(null);

  const updateHiddenGrid = (grid: boolean[][], selected: ValidNumber[]) => {
    const gridCopy = [...grid];
    const rowToReplace = gridCopy[selected[0]];
    rowToReplace.splice(selected[1], 1, false);
    setHiddenGrid(gridCopy);
  };

  const checkIsComplete = (grid: boolean[][]) => {
    return grid?.every((row) => {
      return row.every((col) => {
        return col !== true;
      });
    });
  };

  const handleKeyDownSuccess = (grid: boolean[][], selected: ValidNumber[]) => {
    console.log("got it right!");
    updateHiddenGrid(grid, selected);
    setSuccessXY(selected);
    setSelectedXY(null);
    const isComplete = checkIsComplete(grid);
    if (isComplete) {
      setTimeout(() => alert("You did it! 🎉"), 0);
    }
  };

  const handleKeyDownFail = (selected: ValidNumber[]) => {
    console.log("got it wrong :(");
    setFailXY(selected);
  };

  useEffect(() => {
    setLines(getLines());
    setHiddenGrid(getHidden(difficultyLevel));
  }, [difficultyLevel]);

  useEffect(() => {
    if (!successXY) {
      return;
    }
    const timer = setTimeout(() => {
      setSuccessXY(null);
    }, 500);
    return () => clearTimeout(timer);
  }, [successXY]);

  useEffect(() => {
    if (!failXY) {
      return;
    }
    const timer = setTimeout(() => {
      setFailXY(null);
    }, 500);
    return () => clearTimeout(timer);
  }, [failXY]);

  useEffect(() => {
    const getSelectedValue = (): ValidNumber | null => {
      if (!selectedXY || !lines) {
        return null;
      }
      return lines[selectedXY[0]][selectedXY[1]];
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const code = Number(event.key);
      if (selectedXY && hiddenGrid && code && code === getSelectedValue()) {
        handleKeyDownSuccess(hiddenGrid, selectedXY);
      } else if (selectedXY) {
        handleKeyDownFail(selectedXY);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="App">
      <h1>Welcome to Sudoku React</h1>
      {lines && hiddenGrid ? (
        <>
          <SudokuContainer
            lines={lines}
            hiddenGrid={hiddenGrid}
            selectedXY={selectedXY}
            setSelectedXY={setSelectedXY}
            successXY={successXY}
            failXY={failXY}
          />
          <DifficultyToggle
            setDifficultyLevel={setDifficultyLevel}
            difficultyLevel={difficultyLevel}
          />
        </>
      ) : null}
    </div>
  );
}

export default App;
