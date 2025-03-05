import { DifficultyLevel } from "../types/sudoku-types";
import "./DifficultyToggle.css";

const DifficultyToggle = ({
  difficultyLevel,
  setDifficultyLevel,
}: {
  difficultyLevel: DifficultyLevel;
  setDifficultyLevel: (level: DifficultyLevel) => void;
}) => {
  return (
    <div className="difficulty-toggle">
      <button
        className={difficultyLevel === 1 ? "selected" : ""}
        onClick={() => setDifficultyLevel(1)}
      >
        Easy
      </button>
      <button
        className={difficultyLevel === 2 ? "selected" : ""}
        onClick={() => setDifficultyLevel(2)}
      >
        Medium
      </button>
      <button
        className={difficultyLevel === 3 ? "selected" : ""}
        onClick={() => setDifficultyLevel(3)}
      >
        Hard
      </button>
    </div>
  );
};

export default DifficultyToggle;
