import React,{useState, useEffect, useRef}from 'react'
import './StopWatch.css'

const StopWatch = () => {

  const [seconds, setSeconds] = useState("00")
  const [minutes, setMinutes] = useState("00")
  const [hours, setHours] = useState("00")

  const initialSec = useRef(0)
  const initialMin = useRef(0)
  const initialHr = useRef(0)
  const inertvalId = useRef(0)
  const [pause, setPause] = useState(true)

  useEffect(()=>{
    if(!pause){
      inertvalId.current = setInterval(()=>{
        initialSec.current++
        setSeconds(initialSec.current)
        if(initialSec.current === 60){
          initialSec.current = 0
          initialMin.current++
          setMinutes(initialMin.current)
          if(initialMin.current === 60){
            initialMin.current = 0
            initialHr.current++
            setHours(initialHr.current)
          }
        }

      },1000)
    }
    return ()=>clearInterval(inertvalId.current)

  },[pause])


  function startTimer() {
    if(pause){
      setPause(false)
    }else{
      setPause(true)
    }
  }
  const pauseTimer = ()=>{
    setPause(true)
  }
  const resetTimer = ()=>{
    setSeconds("00")
    setMinutes("00")
    setHours("00")
    initialSec.current = 0
    initialMin.current = 0
    initialHr.current = 0
    clearInterval(inertvalId.current)
    setPause(true)
  }


  return (
    <>
      <div className="stopwatch-container">
        <div className="time-container">
         <span id="timer">{hours}:{minutes}:{seconds}</span> 
        </div>
        <div className="btn-container">
          <button onClick={
            pause===true
            ?startTimer
            :pauseTimer
          }>

            {pause===true? "Start":"Pause"}
          </button>
          <button onClick={resetTimer}>Reset</button>
        </div>

      </div>
    </>
  )
}

export default StopWatch
