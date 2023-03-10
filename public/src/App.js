import './App.css';
import PlatformerGame from './PlatformerGame';
import {useState, useEffect, useRef} from 'react'
import Dashboard from './Dashboard';
import States from './States';
import GeneticAlgorithm from './GeneticAlgorithm';

// TODO: Implement mrate logic into dashboard and platformergame

function App() {
  let {gameStates} = States 
  const [popSize, setPopSize] = useState(20)
  const [gameState, setGameState] = useState(gameStates.stopped) 
  const [speedMult, setSpeedMult] = useState(1)
  const [cRate, setCRate] = useState(0.8)
  const [mRate, setMRate] = useState(0.4)
  const [sAlgor, setSAlgor] = useState();
  const popSizeRef = useRef(popSize)
  const gameStateRef = useRef(gameState)
  const speedMultRef = useRef(speedMult)
  const cRateRef = useRef(cRate)
  const mRateRef = useRef(mRate)
  const sAlgorRef = useRef(sAlgor)
  
  function startGame(){
    if(gameState === gameStates.stopped){
      setGameState(gameStates.starting)
    }
  }

  function updatePopSize(newPopSize){
    setPopSize(newPopSize)
    console.log("changed popsize: " + popSize)
  
  }

  function updateGameState(state){
    setGameState(state)
  }

  function updateSpeedMult(newSpeed){
    setSpeedMult(newSpeed)
  }

  function updateCRate(newCRate){
    setCRate(newCRate)
  }

  function updateMRate(newMRate){
    setMRate(newMRate)
  }
  
  function updateSAlgor(newSAlgor){
    setSAlgor(newSAlgor)
  }

  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])
  useEffect(() =>{
    popSizeRef.current = popSize
  }, [popSize])
  useEffect(() =>{
    speedMultRef.current = speedMult
  },[speedMult])
  useEffect(() =>{
    cRateRef.current = cRate
  }, [cRate])
  useEffect(() =>{
    mRateRef.current=mRate
  }, [mRate])
  useEffect(() =>{
    sAlgorRef.current=sAlgor
    console.log(sAlgorRef.current)
  }, [sAlgor])


  return (
    <div className="App">
      <div className='gameContainer'>
        <PlatformerGame
          popSizeRef={popSizeRef}
          gameStateRef={gameStateRef}
          speedMultRef={speedMultRef}
          cRateRef={cRateRef}
          mRateRef={mRateRef}
          sAlgorRef={sAlgorRef}
          updateGameState={updateGameState}
        />
      </div>
       <Dashboard
          popSize={popSize}
          speedMult={speedMult}
          gameState={gameState}
          cRate={cRate}
          mRate={mRate}
          sAlgor={sAlgor}
          startGame={startGame}
          updatePopSize={updatePopSize}
          updateSpeedMult={updateSpeedMult}
          updateCRate={updateCRate}
          updateMRate={updateMRate}
          updateSAlgor={updateSAlgor}
       />
    </div>
  );
}

export default App;
