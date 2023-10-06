import GameManager from "./GameManager.js";
import moveInfo from "../Input/moveInfo.js";
import CollisionService from "./CollisionService.js";
import Field from "./Field.js";
import ExtraMath from "../Util/ExtraMath.js";
import ProjectileManager from "../Projectiles/ProjectileManager.js";

export default class CharacterManager {

    //stores character element
    Character;

    //final values
    Speed;
    RotationSpeed;
    CrashGravity;
    ProjectileType;

    //health
    Hearts;

    //used for movement
    CurrX;
    GoalX;
    CurrY;
    GoalY;
    CurrR;
    GoalR;

    constructor(){
        
        this.Character = document.getElementById("character");
        this.Character.style.position = "absolute";
        
        this.CurrX = 0;
        this.CurrY = 0;
        this.GoalX = 0;
        this.GoalY = 0;
        this.CurrR = 0;
        this.GoalR = 0;
        
        const thisObj = this;
        $.getJSON("../DataStorage/GameData.json", function(GameData){
            thisObj.Speed = GameData.Player.Movement.speed;
            thisObj.RotationSpeed = GameData.Player.Movement.rotationSpeed;
            thisObj.CrashGravity = GameData.Player.Movement.crashGravity;
            thisObj.ProjectileType = GameData.Player.Movement.firedProjectile;
            thisObj.Hearts = GameData.Player.Health.hearts;
            thisObj.ResetCharacter();
        })
        
    }

    SetPosition(Horizontal, Vertical){
        this.CurrX = Horizontal;
        this.CurrY = Vertical;
        this.GoalX = this.CurrX;
        this.GoalY = this.CurrY;
        this.Character.style.left = this.CurrX + "px";
        this.Character.style.top = this.CurrY + "px";
    }

    UpdateRotation(Rotation, DeltaTime){
        this.GoalR = this.GoalR + Rotation;
        this.CurrR = ExtraMath.lerp(
            this.CurrR,
            this.GoalR,
            DeltaTime
        )
        this.Character.style.transform = 'rotate(' + this.CurrR + 'deg)';
    }

    UpdatePosition(Horizontal, Vertical, DeltaTime, DoClamp = true){
        
        this.GoalX = DoClamp?ExtraMath.clamp(
            (this.GoalX + Horizontal),
            Field.FieldMinX,
            Field.FieldMaxX - this.Character.offsetWidth
        ):(this.GoalX + Horizontal);
        
        this.GoalY = DoClamp?ExtraMath.clamp(
            (this.GoalY + Vertical),
            Field.FieldMinY,
            Field.FieldMaxY - this.Character.offsetHeight
        ):(this.GoalY + Vertical);

        this.CurrX = ExtraMath.lerp(
            this.CurrX,
            this.GoalX,
            DeltaTime
        );
        
        this.CurrY = ExtraMath.lerp(
            this.CurrY,
            this.GoalY,
            DeltaTime
        );
        
        this.Character.style.left = this.CurrX + "px";
        this.Character.style.top = this.CurrY + "px";
        
    }

    ResetCharacter(){
        console.log(this.Speed)
        this.SetPosition(
            (Field.FieldMaxX - Field.FieldMinX)/2,
            (Field.FieldMaxY - Field.FieldMinY)/2
        );
        this.CurrR = 0;
        this.GoalR = 0;
    }

    CheckCollisions(){
        const bombs = document.querySelectorAll(".bomb");
        for(let bomb of bombs){
            if(CollisionService.isColliding(this.Character, bomb)){
                GameManager.EndGame();
                break;
            }
        }
    }

    PrimaryAction(){
        ProjectileManager.Create(
            this.ProjectileType,
            this.CurrX,
            this.CurrY,
            this.CurrR,
        );
    }

    CrashUpdate(DeltaTime){

        if(!CollisionService.isColliding(this.Character, Field.FieldElement)) { return; }

        this.UpdateRotation(
            1 * this.RotationSpeed,
            DeltaTime * 5
        );

        this.UpdatePosition( 
            (this.GoalX - this.CurrX >= 0)?1:-1,
            this.CrashGravity,
            DeltaTime * 5,
            false
        );

    }

    Update(DeltaTime){

        const rotation = moveInfo.rotation;

        this.UpdateRotation(
            rotation * this.RotationSpeed,
            DeltaTime * 5
        );
        
        this.UpdatePosition( 
            Math.cos(this.CurrR * Math.PI / 180) * this.Speed,
            Math.sin(this.CurrR * Math.PI / 180) * this.Speed,
            DeltaTime * 5
        );

        this.CheckCollisions();

    }

}