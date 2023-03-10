import Entity from "./Entity"

export default class Goal extends Entity{
    constructor(x, y, w, h){
        super(x,y,w,h)
    }

    draw(ctx){
        ctx.fillStyle = "yellow"
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}