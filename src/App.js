import React from 'react';
import './App.css';
import Board from 'react-trello';
import data from "./data";
import Timer from './Timer';
import { useTimer } from './hooks'

const App = () => {
  const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
}

  const handleDragStart = (cardId, laneId) => {
    console.log({ cardId }, { laneId });
  }

  const Timer = () => {
    const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0)
    return (
      <div className="app">
            <h3>React Stopwatch</h3>
            <div className='stopwatch-card'>
                <p>{formatTime(timer)}</p>
                <div className='buttons'>
                    {
                        !isActive && !isPaused ?
                            <button onClick={handleStart}>Start</button>
                            : (
                                isPaused ? <button onClick={handlePause}>Pause</button> :
                                    <button onClick={handleResume}>Resume</button>
                            )
                    }
                    <button onClick={handleReset} disabled={!isActive}>Reset</button>
                </div>
            </div>
        </div>
    )
  }
  
  return (
    <div className="App">
      <h1>PETVET</h1>
      <Timer />
      <Board
        data={data}
        handleDragStart={handleDragStart}
      />
    </div>
  );
}

export default App;


