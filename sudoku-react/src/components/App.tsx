import { useState } from "react";
import "./App.css";
import DifficultyToggle from "./DifficultyToggle";
import SudokuContainer from "./SudokuContainer";

function App() {
  const [difficultyLevel, setDifficultyLevel] = useState<1 | 2 | 3>(1);

  return (
    <div className="App">
      <h1>Welcome to Sudoku React</h1>
      <SudokuContainer difficultyLevel={difficultyLevel} />
      <DifficultyToggle setDifficultyLevel={setDifficultyLevel} />
    </div>
  );
}

export default App;
