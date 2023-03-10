import { useEffect, useRef } from "react"
import "./PlatformerGame.css"
import States from "./States"
import EntityData from "./data"
import Individual from "./Individual"
import Moves from "./moves"
import Collision from "./Collision"
import Entity from "./Entity"
import Goal from "./Goal"
import GeneticAlgorithm from "./GeneticAlgorithm"


// Assignments to the 'GA' variable from inside React Hook useEffect will be lost after each render. To preserve the value over time, 
//store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useEffect  
// TODO: Fix the above bug for GA and population

const PlatformerGame = props =>{
    const canvasRef = useRef(null)
    let {gameStates} = States 
    let {canvasData, individualData, goalData} = EntityData

    let population = useRef()
    let goal = new Goal(goalData.x, goalData.y, goalData.w, goalData.h)
    let collision = new Collision()
    let GA = null;
    //let fps = 60
    //let fpsInterval = 1000/fps
    //let startTime = Date.now()

    let iteration = useRef(0)

    useEffect(() =>{
        function initialiseGame(){
            //console.log("initialising population...")

            population.current = []
            for(let i=0; i<props.popSizeRef.current; i++){
                let individual = new Individual(individualData.x, individualData.y, individualData.w, individualData.h)
                individual.moves = (Array.from({length: 100}, () => Moves[Math.floor(Math.random()*3)])) 
                population.current.push(individual)
            }
            console.log(population.current)
            iteration.current = 0
            GA = new GeneticAlgorithm(props.sAlgorRef.current, props.cRateRef.current, props.mRateRef.current)
        }
        function resetGame(){
            ///console.log("popsize: " + population.length)
            for(let i=0; i<props.popSizeRef.current; i++){
                population.current[i].reset()
            }
            iteration.current=0
        }
        
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const render = () =>{
           
            //if(Date.now() - startTime > fpsInterval){
    
                //startTime = Date.now()
                switch(props.gameStateRef.current){
                    case gameStates.starting:
                        //console.log("starting game...")
                        initialiseGame()
                        props.updateGameState(gameStates.running)
                        
                        break
                    case gameStates.running:
                        
                        ctx.clearRect(0,0, canvasData.w, canvasData.h)
                        goal.draw(ctx)

                    
                        //for(let j=0; j<props.speedMultRef.current; j++){
                            

                            // update every individual in the population draw it to the screen
                            for(let i=0; i<props.popSizeRef.current; i++){
                                population.current[i].update(iteration.current)
                                
                                population.current[i].draw(ctx)
                                
                                if(collision.isColliding(population.current[i], goal)){
                                    population.current[i].won()
                                }
                            
                                // if(population[i].iteration === population[0].moves.length){
                                //     population[i].evaluate(goal.x, goal.y)
                                // }
                            }
                            iteration.current++;
                            console.log(iteration.current)
                           // console.log("iteration: " + population[0].iteration)
                            if(iteration.current === population.current[0].moves.length){
                                for(let i=0; i<props.popSizeRef.current; i++){
                                    population.current[i].evaluate(goal.x, goal.y)
                                }
                                
                                population.current = GA.evolve(2, population.current)
                                //console.log(population)
                                // console.log("popsize: " + population.length)
                                // console.log("moves:" + population[0].moves.length)
                                resetGame()
                            }
                        //} 
                        break
                    default:
                        break
                }
                
            //}
            requestAnimationFrame(render)
        }
        render()
        
        
    },[])
    
    return(
        <canvas id="GameCanvas"
            width={canvasData.w}
            height={canvasData.h}
            ref={canvasRef}
        />
    )
}

export default PlatformerGame