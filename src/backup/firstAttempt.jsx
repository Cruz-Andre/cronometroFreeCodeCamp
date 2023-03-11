import { useEffect, useState } from 'react';

import './styles/App.css'

function App() {
  const [time, setTime] = useState(5); //1500
  const [sessionLength, setSessionLength] = useState(25);

  const [breakTime, setBreakTime] = useState(5); //300
  const [breakLength, setBreakLength] = useState(5);

  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            //setTimerRunning(false);
            return 0;
          } else {
            return prevTime - 1;
          }
        });        
      }, 1000);
    }

    if (time === 0 && timerRunning) {
      intervalId = setInterval(() => {
        setBreakTime((prevTime) => {
          if (prevTime <= 0) {
            //setTimerRunning(false);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000)
    }

    return () => clearInterval(intervalId);

  }, [timerRunning]);

  console.log(time === 0, time)
  console.log(breakTime)

  const handleStartPause = () => {
    if (timerRunning) {
      setTimerRunning(false);
    } else {
      setTimerRunning(true);
    }
  };

  const handleReset = () => {
    setTime(1500);
    setSessionLength(25)

    setBreakTime(300)
    setBreakLength(5)

    setTimerRunning(false);
  };

  const handleIncrement = (set) => {
    setTime((prevTime) => prevTime < 3600? prevTime + 60 : 3600);
    setBreakTime((prevTime) => prevTime < 3600? prevTime + 60 : 3600);
    set((prevTime) => prevTime < 60 ? prevTime + 1 : 60);
    //setSessionLength((prevTime) => prevTime < 60 ? prevTime + 1 : 60);
  };

  const handleDecrement = (set) => {
    setTime((prevTime) => (prevTime > 60 ? prevTime - 60 : 60));
    setBreakTime((prevTime) => (prevTime > 60 ? prevTime - 60 : 60));
    set((prevTime) => prevTime > 1 ? prevTime - 1 : 1);
    //setSessionLength((prevTime) => prevTime > 1 ? prevTime - 1 : 1);
  };

  const formatTime = (time) => {
    //const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    //const seconds = (time % 60).toString().padStart(2, '0');
    const minutes = Math.floor(time / 60).toLocaleString('pt-BR', {minimumIntegerDigits: 2})
    const seconds = (time % 60).toLocaleString('pt-BR', {minimumIntegerDigits: 2})
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
          <div id="time-left">{formatTime(time)}</div>
        </div>
        <div className="timer-wrapper">
          <div id="timer-label">BreakTime</div>
          <div id="time-left">{formatTime(breakTime)}</div>
        </div>
      </div>

      <div className="timer-control">
        <button onClick={handleStartPause} id="start_stop">{timerRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset} id="reset">Reset</button>
      </div>
    </div>
  )
}

export default App
