import { useEffect, useState } from 'react';

import './styles/App.css'

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);

  const [timerLabel, setTimerLabel] = useState("Session");

  const [intervalID, setIntervalID] = useState(null);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  const handleStartStop = () => {
    if (intervalID) {
      clearInterval(intervalID);
      setIntervalID(null);
    } else {
      const newIntervalID = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setIntervalID(newIntervalID);
    }
  };

  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    clearInterval(intervalID);
    setIntervalID(null);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handleLengthChange = (tickTime, type) => {
    if (intervalID === null) {
      const newLength = type === "session" ? sessionLength + tickTime : breakLength + tickTime;
      if (newLength >= 1 && newLength <= 60) {
        if (type === "session") {
          setSessionLength(newLength);
          setTimeLeft(newLength * 60);
          setTimerLabel("Session");
        } else {
          setBreakLength(newLength);
        }
      }
    }
  };

  useEffect(() => {
    if (timeLeft === -1) {
      const audio = document.getElementById("beep");
      audio.currentTime = 0;
      audio.play();
      if (timerLabel === "Session") {
        setTimeLeft(breakLength * 60);
        setTimerLabel("Break");
      } else {
        setTimeLeft(sessionLength * 60);
        setTimerLabel("Session");
      }
    }
  }, [timeLeft, breakLength, sessionLength, timerLabel]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toLocaleString('pt-BR', { minimumIntegerDigits: 2 })
    const seconds = (time % 60).toLocaleString('pt-BR', { minimumIntegerDigits: 2 })
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="App">
      <h1>Relógio 25 + 5 (Cronômetro)</h1>

      <div className="length-control">
        <div id="break-label">Break Length</div>
        <button onClick={() => handleLengthChange(-1, "break")} id="break-decrement" value="-">-</button>
        <div id="break-length">{breakLength}</div>
        <button onClick={() => handleLengthChange(1, "break")} id="break-increment" value="+">+</button>
      </div>

      <div className="length-control">
        <div id="session-label">Session Length</div>
        <button onClick={() => handleLengthChange(-1, "session")} id="session-decrement" value="-">-</button>
        <div id="session-length">{sessionLength}</div>
        <button onClick={() => handleLengthChange(1, "session")} id="session-increment" value="+">+</button>
      </div>

      <div className="timer">
        <div className="timer-wrapper">
          <div id="timer-label">{timerLabel}</div>
          <div id="time-left">{formatTime(timeLeft)}</div>
        </div>
      </div>

      <div className="timer-control">
        <button onClick={handleStartStop} id="start_stop">{intervalID ? "Stop" : "Start"}</button>
        <button onClick={handleReset} id="reset">Reset</button>
      </div>
      <audio id="beep" src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" />
    </div>
  )
}

export default App
