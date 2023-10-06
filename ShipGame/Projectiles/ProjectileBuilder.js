import EntityService from "../Game/EntityService.js";

export default {

    ["PlayerBullet"]:() => {
        let newProjectile = document.createElement("div");
        newProjectile.className = "player-bullet";
        newProjectile.id = EntityService.GetEntityId();
    }

}
       