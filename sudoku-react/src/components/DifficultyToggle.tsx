const DifficultyToggle = ({
  setDifficultyLevel,
}: {
  setDifficultyLevel: (level: 1 | 2 | 3) => void;
}) => {
  return (
    <div className="difficulty-toggle">
      <button onClick={() => setDifficultyLevel(1)}>Easy</button>
      <button onClick={() => setDifficultyLevel(2)}>Medium</button>
      <button onClick={() => setDifficultyLevel(3)}>Hard</button>
    </div>
  );
};

export default DifficultyToggle;
