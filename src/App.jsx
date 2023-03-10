import { useEffect, useState } from 'react';

import './styles/App.css'

function App() {
  const [time, setTime] = useState(1500);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            setTimerRunning(false);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerRunning]);

  const handleStartPause = () => {
    if (isRunning) {
      setTimerRunning(false);
      setIsRunning(false);
    } else {
      setTimerRunning(true);
      setIsRunning(true);
    }
  };
  
  // const handleStart = () => {
  //   setTimerRunning(true);
  // };

  // const handlePause = () => {
  //   setTimerRunning(false);
  // };

  const handleReset = () => {
    setTime(1500);
    setSessionLength(25)
    setTimerRunning(false);
  };

  const handleIncrement = (set) => {
    setTime((prevTime) => prevTime < 3600? prevTime + 60 : 3600);
    set((prevTime) => prevTime < 60 ? prevTime + 1 : 60);
    //setSessionLength((prevTime) => prevTime < 60 ? prevTime + 1 : 60);
  };

  const handleDecrement = (set) => {
    setTime((prevTime) => (prevTime > 60 ? prevTime - 60 : 60));
    set((prevTime) => prevTime > 1 ? prevTime - 1 : 1);
    //setSessionLength((prevTime) => prevTime > 1 ? prevTime - 1 : 1);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };


  return (
    <div className="App">
      <h1>Relógio 25 + 5 (Cronômetro)</h1>

      <div className="length-control">
        <div id="break-label">Break Length</div>
        <button onClick={() => handleDecrement(setBreakLength)} className="btn-level" id="break-decrement" value="-">-</button>
        <div className="btn-level" id="break-length">{breakLength}</div>
        <button onClick={() => handleIncrement(setBreakLength)} className="btn-level" id="break-increment" value="+">+</button>
      </div>

      <div className="length-control">
        <div id="session-label">Session Length</div>
        <button onClick={() => handleDecrement(setSessionLength)} className="btn-level" id="session-decrement" value="-">-</button>
        <div className="btn-level" id="session-length">{sessionLength}</div>
        <button onClick={() => handleIncrement(setSessionLength)} className="btn-level" id="session-increment" value="+">+</button>
      </div>

      <div className="timer">
        <div className="timer-wrapper">
          <div id="timer-label">Session</div>
          <div id="time-left">{formatTime()}</div>
        </div>
      </div>

      <div className="timer-control">
        <button onClick={handleStartPause} id="start_stop">{isRunning ? 'Pause' : 'Start'}</button>
        {/* <button onClick={handleStart} id="start_stop">Start</button>
        <button onClick={handlePause} id="start_stop">Pause</button> */}
        <button onClick={handleReset} id="reset">Reset</button>
      </div>
    </div>
  )
}

export default App
