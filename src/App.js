import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Board from 'react-trello';
import data from "./data";
import { useTimer } from './hooks'

const App = () => {
  const [currentCard, setCard] = useState('');
  const [currentLane, setLane] = useState('');
  const [label, setLabel] = useState('')

  const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const countRef = useRef(null)

    const handleStart = () => {
      setIsActive(true)
      setIsPaused(true)
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1)
        updateLabel(timer => timer + 1);
      }, 1000)
    }

    const handlePause = () => {
      clearInterval(countRef.current)
      setIsPaused(false)
    }

    const handleResume = () => {
      setIsPaused(true)
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    }

    const handleReset = () => {
      clearInterval(countRef.current)
      setIsActive(false)
      setIsPaused(false)
      setTimer(0)
    }
    // useEffect(() => {
    //   updateLabel();
    // }, [timer])
    return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
  }
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0)


  const handleDragStart = (cardId, laneId) => {
    setCard(cardId);
    setLane(laneId);
    data.lanes.forEach(lane => {
      if (lane.id === laneId) {
        lane.cards.forEach(card => {
          if (card.id === cardId) {
            console.log({ label });
            // card.label = label;
            card.label = formatTime(0);
          }
        })
      }
    })
  }
  const handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    handleStart();
  }

  let newData = data;

  const updateLabel = () => {
    console.count('update')
    data.lanes.forEach(lane => {
      if (lane.id === currentLane) {
        lane.cards.forEach(card => {
          if (card.id === currentCard) {
            console.log(formatTime(timer + 1));
            // TODO: need the react to recognize this as a change 
            card.label = formatTime(timer + 1);
            card = {...card, label: formatTime(timer + 1)}
          }
        })
      }
    })
    newData = {...data}
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

  useEffect(() => {
    updateLabel();
  }, [timer])

  return (
    <div className="App">
      <h1>PETVET</h1>
      <Timer />
      <Board
        data={newData}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      // onDataChange={updateLabel}
      />
    </div>
  );
}

export default App;


