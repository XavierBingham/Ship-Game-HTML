import EntityService from "../Game/EntityService.js";

export default class PlayerBullet {

    constructor(){
        let newProjectile = document.createElement("div");
        newProjectile.className = "player-bullet";
        newProjectile.id = EntityService.GetEntityId();
    }

}