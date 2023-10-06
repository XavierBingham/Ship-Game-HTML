import moveInfo from "./moveInfo.js";
import GameManager from "../Game/GameManager.js";

export default {

    Rotate:function(InputManager, InputObject, PressedDown){
        
        const leftDown = InputManager.BindHasKeysDown("rotateLeft")?-1:0;
        const rightDown = InputManager.BindHasKeysDown("rotateRight")?1:0;

        let rotationDirection = leftDown + rightDown;

        moveInfo.rotation = rotationDirection;
        
    },

    PrimaryAction:function(InputManager, InputObject, PressedDown){

        const character = GameManager.GetCharacter();
        character.PrimaryAction();

    }

}