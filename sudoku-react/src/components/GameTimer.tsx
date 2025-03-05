import { useEffect, useRef, useState } from "react";

const GameTimer = ({ enableTimer }: { enableTimer: boolean }) => {
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const [seconds, setSeconds] = useState<number>(0);

  const formatTime = (time: number): string => {
    // TODO: properly calculate hours
    const hours = null; // Math.floor(time / (60 * 60));
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${hours ? hours + ":" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  useEffect(() => {
    if (enableTimer) {
      timerRef.current = setInterval(() => {
        // Note that the second will be doubled in dev env due to StrictMode
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current as NodeJS.Timeout);
    }
  }, [enableTimer]);

  return <div>{formatTime(seconds)}</div>;
};

export default GameTimer;
