import inputBinds from "./inputBinds.js";

export default class InputManager {

    KeysDown;
    InputEvents;
    KeyMapLookup;
    BindIdLookup;

    constructor(){

        this.KeysDown = [];
        this.InputEvents = [];
        this.KeyMapLookup = new Map();
        this.BindIdLookup = new Map();

        for(let [bindId, bindInfo] of inputBinds){

            const newInputBind = {
                InputHandler:bindInfo.InputHandler,
                Keybinds:bindInfo.Keybinds,
                Enabled:false
            }

            this.BindIdLookup[bindId] = newInputBind;
            for(let keybind of bindInfo.Keybinds){
                if(this.KeyMapLookup[keybind] === undefined){
                    this.KeyMapLookup[keybind] = [];
                }
                this.KeyMapLookup[keybind].push(newInputBind);
            }

        }
        
        const self = this;

        this.InputEvents.push(document.onkeydown = function(InputObject){
            self.ProcessInput(InputObject, true);
        });

        this.InputEvents.push(document.onkeyup = function(InputObject){
            self.ProcessInput(InputObject, false);
        });

    }

    BindHasKeysDown(BindId){
        const inputBind = this.BindIdLookup[BindId];
        for(let keybind of inputBind.Keybinds){
            if(this.KeysDown[keybind]){
                return true;
            }
        }
        return false;
    }

    EnableBind(BindId){
        const inputBind = this.BindIdLookup[BindId];
        if(inputBind !== undefined){
            inputBind.Enabled = true;
        }
    }

    DisableBind(BindId){
        const inputBind = this.BindIdLookup[BindId];
        if(inputBind !== undefined){
            inputBind.Enabled = false;
        }
    }

    ProcessInput(InputObject, PressedDown){

        const pressedKey = InputObject.key;
        const keyLookup = this.KeyMapLookup[pressedKey];

        this.KeysDown[pressedKey] = PressedDown;

        if(keyLookup !== undefined){
            for(let inputBind of this.KeyMapLookup[pressedKey]){
                if(inputBind.Enabled){
                    if(inputBind.InputHandler !== undefined){
                        inputBind.InputHandler(this, InputObject, PressedDown);
                    }
                    break;
                }
            }
        }

    }

}