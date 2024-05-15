import React, { useState, useEffect } from "react";
interface CountdownTimerProps {
  resetKey: number;
}
const CountdownTimer: React.FC<CountdownTimerProps> = ({ resetKey }) => {
  const [time, setTime] = useState(600);
  useEffect(() => {
    setTime(600);
  }, [resetKey]);
  useEffect(() => {
    if (time <= 0) return;

    const timerId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return <div>{formatTime(time)}</div>;
};

export default CountdownTimer;
