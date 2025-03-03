import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
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

  // const lines: RefObject<ValidNumber[][] | null> = useRef(null);
  // if (!lines.current) {
  //   lines.current = getLines();
  // }

  // const hiddenGrid: RefObject<boolean[][] | null> = useRef(null);
  // if (!hiddenGrid.current) {
  //   hiddenGrid.current = getHidden(difficultyLevel);
  // }

  useLayoutEffect(() => {
    setLines(getLines());
    setHiddenGrid(getHidden(difficultyLevel));
  }, [difficultyLevel]);

  console.log("difficultyLevel", difficultyLevel);

  return (
    <div className="App">
      <h1>Welcome to Sudoku React</h1>
      {lines && hiddenGrid ? (
        <>
          <SudokuContainer lines={lines} hiddenGrid={hiddenGrid} />
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
