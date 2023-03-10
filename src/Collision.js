export default class Collision{
    isColliding = (entity1, entity2) =>{
        const a = entity1.x < entity2.x + entity2.w
        const b = entity1.x + entity1.w > entity2.x 
        const c = entity1.y < entity2.y + entity2.h
        const d = entity1.y + entity1.h > entity2.y
    
        return (a&&b&&c&&d)
    }
}