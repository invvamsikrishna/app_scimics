import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { Typography } from "@mui/material";

const TimerWidget = forwardRef(({ handleFinish }, ref) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const timerIdRef = useRef(null);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      clearTimer();
      handleFinish();
    }
  }, [timeLeft]);

  const startTimer = (seconds) => {
    setTimeLeft(seconds);
    timerIdRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        return prevTime - 1;
      });
    }, 1000);
  };

  const clearTimer = () => {
    clearInterval(timerIdRef.current);
    setTimeLeft(0);
    // console.log("clear timer");
  };

  const getTimeRemaining = () => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useImperativeHandle(ref, () => ({
    startTimer,
    clearTimer,
    getTimeRemaining,
  }));

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Typography variant="subtitle1" fontSize={20} fontWeight={500} color="#C75C5C">
      Time Left: {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </Typography>
  );
});

export default TimerWidget;
