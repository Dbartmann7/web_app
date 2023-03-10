import States from "./States"
import Moves from "./moves"
import Entity from "./Entity"

let {individualStates} = States

export default class Individual extends Entity{
    constructor(x, y, w, h){
        super(x,y,w,h)
        this.vy = 0
        this.initx = x
        this.inity = y
        this.speed = 10

        this.moves = []
        this.fitness = null

        this.onGround = true

        this.state = individualStates.alive
    }

    setMoves(moves){
        this.moves = moves
    }

    update(iteration){
        if(this.state === individualStates.alive){
            if(this.moves[iteration] === Moves[0]&& this.onGround){
                this.vy = 20
                this.onGround = false
            }
            if(this.moves[iteration] === Moves[1]){
                this.x -= this.speed
            }
            if(this.moves[iteration] === Moves[2]){
                this.x += this.speed
            }   
        }
        if(!this.onGround){
            this.y -= this.vy
            this.vy -= 2
        }else{
            this.y = 450
            this.vy = 0
        }
        if(this.x < 0) this.x=0
        if(this.x > 1200-this.w) this.x=1200-this.w
        if(this.x<0) this.x = 0
        if(this.y >=450){
            this.y = 450
            this.onGround = true
        } 
    }

    draw(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(this.x-5, this.y-5, this.w+10, this.h+10) 
        switch(this.state){
            case individualStates.alive:
                ctx.fillStyle="green"
                break
            case individualStates.dead:
                ctx.fillStyle="red"
                break
            case individualStates.won:
                ctx.fillStyle="blue"
                break
            default:
                console.log("unknown state")
                ctx.fillStyle="purple"
                break
        }
        ctx.fillRect(this.x, this.y, this.w, this.h) 
    }

    won(){
        this.state=individualStates.won
    }

    // nextMove(){
    //     this.iteration++
    // }

    evaluate(goalx, goaly){
        let a = Math.pow(goalx + this.w - this.x, 2)
        let b = Math.pow(goaly - this.y, 2)
        this.fitness = Math.sqrt(a + b)
        if(this.state === individualStates.dead){
            this.fitness += 100
        }
        if(this.state=== individualStates.won){
            this.fitness -= 100
        }
    }

    reset(){
        this.x = this.initx
        this.y = this.inity
        this.state = individualStates.alive
        this.fitness = null
    }
}