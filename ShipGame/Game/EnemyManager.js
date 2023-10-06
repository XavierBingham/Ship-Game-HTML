import Bomb from "./Bomb.js";

const _Settings = {
    MaxBombCount:20,
    BombSpawnRate:1,
}

export default {

    Bombs:[],
    LastBombSpawn:0,

    UpdateBombs(){
        
        if(this.Bombs.length >= _Settings.MaxBombCount){return;}

        let currDate = Date.now();
        if((currDate - this.LastBombSpawn)/1000 >= _Settings.BombSpawnRate){
            this.LastBombSpawn = currDate;
            let newBomb = new Bomb();
            this.Bombs.push(newBomb);
        }

    },

    ClearEntities(){
        for(let bomb of this.Bombs){
            bomb.BombElement.remove();
        }
        this.Bombs = [];
    },

    GetBombs(){
        return this.Bombs;
    },

    Update(DeltaTime){
        this.UpdateBombs();
    },

}