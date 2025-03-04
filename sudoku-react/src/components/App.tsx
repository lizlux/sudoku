import { useEffect, useState } from "react";
import "./App.css";
import DifficultyToggle from "./DifficultyToggle";
import SudokuContainer from "./SudokuContainer";
import { getHidden } from "../helpers/setUpGame";
import { ValidNumber } from "../types/sudoku-types";
import getLines from "../helpers/getSudokuGrid";

function App() {
  const [difficultyLevel, setDifficultyLevel] = useState<1 | 2 | 3>(1);
  const [lines, setLines] = useState<ValidNumber[][] | null>(null);
  const [hiddenGrid, setHiddenGrid] = useState<boolean[][] | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<ValidNumber | null>(
    null
  );
  const [selectedColIndex, setSelectedColIndex] = useState<ValidNumber | null>(
    null
  );

  useEffect(() => {
    setLines(getLines());
    setHiddenGrid(getHidden(difficultyLevel));
  }, [difficultyLevel]);

  useEffect(() => {
    const getSelectedValue = (): ValidNumber | null => {
      if (!selectedColIndex || !selectedRowIndex || !lines) {
        return null;
      }
      return lines[selectedRowIndex][selectedColIndex];
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const code = Number(event.key);
      if (
        selectedColIndex &&
        selectedRowIndex &&
        hiddenGrid &&
        code &&
        code === getSelectedValue()
      ) {
        console.log("got it right!");

        const newGrid = [...hiddenGrid];
        const rowToReplace = newGrid[selectedRowIndex];
        rowToReplace.splice(selectedColIndex, 1, false);
        newGrid.splice(selectedRowIndex, 1, rowToReplace);
        setHiddenGrid(newGrid);
      } else {
        console.log("got it wrong :(");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lines, selectedColIndex, selectedRowIndex, hiddenGrid]);

  return (
    <div className="App">
      <h1>Welcome to Sudoku React</h1>
      {lines && hiddenGrid ? (
        <>
          <SudokuContainer
            lines={lines}
            hiddenGrid={hiddenGrid}
            selectedColIndex={selectedColIndex}
            selectedRowIndex={selectedRowIndex}
            setSelectedColIndex={setSelectedColIndex}
            setSelectedRowIndex={setSelectedRowIndex}
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
