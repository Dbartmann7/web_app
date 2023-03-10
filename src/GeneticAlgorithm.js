import { mockComponent } from "react-dom/test-utils"
import Moves from "./moves"

export default class GeneticAlgorithm{
    constructor(sAlgorithm, cRate, mRate){
        this.sAlgorithm = sAlgorithm
        this.cRate = cRate
        this.mRate = mRate
    }

    evolve(tourSize,population){
        let parents = []
        let newPopulation = []
        if(this.sAlgorithm === "tour"){
            console.log("yes")
            // get parentsa
            parents = this.TourSelection(tourSize, population)
            console.log(parents)
            for(let i=0; i<population.length/2; i++){
                let parent1index = Math.floor(Math.random()*population.length)
                let parent2index = Math.floor(Math.random()*population.length)
                while(parent1index === parent2index){
                    parent2index = Math.floor(Math.random()*population.length)
                }
                let parent1 = parents[parent1index]
                let parent2 = parents[parent2index]

                let child1 = parent1
                let child2 = parent2

                // crossover
                if(this.cRate > Math.random()){
                    let cPoint = Math.floor(Math.random()*child1.moves.length)
                    child1.moves = parent1.moves.slice(0, cPoint).concat(parent2.moves.slice(cPoint))
                    child2.moves = parent2.moves.slice(0, cPoint).concat(parent1.moves.slice(cPoint))
                }

                // mutation
                if(this.mRate > Math.random()){
                    let mPoint=Math.floor(Math.random()*child1.moves.length)
                    let oldMove = child1[mPoint]
                    let newMove = Moves[Math.floor(Math.random()*Moves.length)]
                    while(newMove === oldMove){
                        newMove = Moves[Math.floor(Math.random()*Moves.length)]
                    }
                    child1.moves[mPoint] = newMove
                    
                    oldMove = child2.moves[mPoint]
                    newMove = Moves[Math.floor(Math.random()*Moves.length)]
                    while(newMove === oldMove){
                        newMove = Moves[Math.floor(Math.random()*Moves.length)]
                    }
                    child2.moves[mPoint] = newMove
                }
                // add to new popuation
                newPopulation.push(child1)
                newPopulation.push(child2)
            }
        }
        // console.log(newPopulation.length)
        
        return newPopulation
    }

    TourSelection(tourSize, population){
        let parents = []
        for(let i=0; i<population.length; i++){
            let participents = []
            let winner = NaN
            for(let j=0; j<tourSize; j++){
                participents.push(population[Math.floor(Math.random()*population.length)])
                if( j===0 || winner.fitness > participents[j].fitness){
                    winner = participents[j]
                }
            } 
            parents.push(winner)
        }
        return parents
    }
}
