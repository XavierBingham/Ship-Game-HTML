import Field from "./Field.js";
import characterManager from "./CharacterManager.js";
import inputManager from "../Input/inputManager.js";
import EnemyManager from "./EnemyManager.js";
import GameState from "./GameState.js";
import ProjectileManager from "../Projectiles/ProjectileManager.js";

let InputManager;
let CharacterManager;

const updateInterval = 8;

export default class GameManager {

    static Load(){

        const newField = Field.Init(document.getElementById("field"));

        InputManager = new inputManager();
        CharacterManager = new characterManager();

        InputManager.EnableBind("rotateLeft");
        InputManager.EnableBind("rotateRight");
        //InputManager.EnableBind("primaryAction");
        this.ResetGame();
    
    }
    
    static ResetGame(){
    
        GameState.ChangeState("Playing");
        EnemyManager.ClearEntities();

        let lastUpdate = Date.now();
        let render; render = setInterval(function(){

            if(GameState.State !== "Playing"){ clearInterval(render); }

            const currDate = Date.now();
            const deltaTime = (currDate - lastUpdate)/1000;
            lastUpdate = currDate;

            CharacterManager.Update(deltaTime);
            EnemyManager.Update(deltaTime);
            ProjectileManager.Update(deltaTime, true);

        }, updateInterval);
    
    }

    static EndGame(){

        GameState.ChangeState("Crashed");

        const resultBox = document.getElementById("game-over-results");
        resultBox.style.visibility = "visible";

        const retryButton = document.getElementById("retry-button");
        retryButton.onclick = function(){
            retryButton.onclick = undefined;
            resultBox.style.visibility = "hidden";
            CharacterManager.ResetCharacter();
            GameManager.ResetGame();
        }

        let lastUpdate = Date.now();
        let render; render = setInterval(function(){

            if(GameState.State !== "Crashed"){ clearInterval(render); }

            const currDate = Date.now();
            const deltaTime = (currDate - lastUpdate)/1000;
            lastUpdate = currDate;

            CharacterManager.CrashUpdate(deltaTime);
            ProjectileManager.Update(deltaTime, false);

        }, updateInterval);

    }

    static GetCharacter(){
        return CharacterManager;
    }

}
