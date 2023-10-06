import Field from "./Field.js";
import EntityService from "./EntityService.js";

export default class Bomb {

    BombElement;

    constructor(spawnX, spawnY){

        let bomb = document.createElement("img");
        bomb.src = "./Images/Bomb.png";
        bomb.className = "bomb";
        bomb.id = EntityService.GetEntityId();
        this.BombElement = bomb;
        bomb.style.left = ((Math.random() * (Field.FieldElement.offsetWidth - 10)) + Field.FieldMinX) + "px";
        bomb.style.top = ((Math.random() * (Field.FieldElement.offsetHeight - 10)) + Field.FieldMinY) + "px";
        Field.FieldElement.appendChild(bomb);

    }

}