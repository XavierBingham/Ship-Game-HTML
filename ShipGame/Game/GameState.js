import moveInfo from "../Input/moveInfo.js";

export default {

    State:undefined,

    ChangeState(State){
        this.State = State;

        if(State === "Playing"){
            moveInfo.rotation = 0;
        }

    }

}