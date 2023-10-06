import CollisionService from "../Game/CollisionService.js";
import ProjectileManager from "./ProjectileManager.js";

export default class Projectile {
    
    Element = undefined
    Speed = undefined
    PosX = undefined
    PosY = undefined
    Rotation = undefined

    constructor(element, speed, posX, posY, rot){
        this.Element = element;
        this.Speed = speed;
        this.PosX = posX;
        this.PosY = posY;
        this.Rotation = rot;
    }

    CheckCollisions(){
        const bombs = document.querySelectorAll(".bomb");
        for(let bomb of bombs){
            if(CollisionService.isColliding(this.Character, bomb)){
                document.removeChild(bomb);
                ProjectileManager.Remove(self);
                break;
            }
        }
    }

    Update(DeltaTime, DoCheckCollisions){

    }

}