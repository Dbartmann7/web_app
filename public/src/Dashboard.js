import './Dashboard.css'
import { useEffect, useRef } from 'react'
import Select from "react-select"
import States from './States'



const Dashboard = (props) =>{
    const speedInputRef = useRef("");
    const popErrRef = useRef("")
    const popInputRef = useRef()
    const crossoverInputRef = useRef()
    const mutationInputRef = useRef()
    const sAlgorRef = useRef();
    let {gameStates} = States 
    
    const options = [
        { value: 'tour', label: 'Tournament' },
    ]

    // population Size Validation
    useEffect(() =>{
        const popErrMsg = popErrRef.current
        if(props.popSize <=0 || props.popSize >500){
             popErrMsg.innerHTML = "Invalid population Size: please enter a value between 1 and 500"
        }else if(!Number.isInteger(props.popSize)){
            popErrMsg.innerHTML = "Invalid type: please enter an integer"
        }else{
            popErrMsg.innerHTML = ""
        }
    }, [props.popSize])

    // disable inputboxes while game is running
    useEffect(() =>{
        const popInput = popInputRef.current
        const crossoverInput = crossoverInputRef.current
        const mutationInput = mutationInputRef.current
        if(props.gameState !== gameStates.stopped){
            popInput.disabled = true
            crossoverInput.disabled = true
            mutationInput.disabled=true
        }else{
            popInput.disabled = false
            crossoverInput.disabled = false
            mutationInput.disabled=false
        }
    }, [props.gameState])


    

    return(
        <div className="dashboardContainer">
            <button id="startBtn" onClick={props.startGame}>
                Start Game
            </button>
            <p ref={popErrRef}></p>
            <input 
                type="text"            
                value={props.speedMult}
                onChange={e=>{props.updateSpeedMult(e.target.value)}}
                ref={speedInputRef}    
            />
            <input 
                type="text"
                value={props.popSize}
                onChange={e =>{props.updatePopSize(e.target.value)}}
                ref={popInputRef}
            />
            <input
                type="text"
                value={props.cRate}
                onChange={e =>{props.updateCRate(e.target.value)}}
                ref={crossoverInputRef}
            />
            <input
                type="text"
                value={props.mRate}
                onChange={e =>{props.updateMRate(e.target.value)}}
                ref={mutationInputRef}
            />
            <Select 
                options={options}
                onChange={e=>{props.updateSAlgor(e.value)}}
            />
        </div>
    )
}

export default Dashboard