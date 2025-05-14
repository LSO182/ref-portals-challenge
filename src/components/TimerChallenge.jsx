import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function timerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  let timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  function handleTimeReset () {
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleTimeReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? "Stop" : "Start"} Challenge
        </button>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Time is runing..." : "Timer stoped"}
        </p>
      </section>
    </>
  );
}
