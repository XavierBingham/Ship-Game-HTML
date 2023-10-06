import inputHandlers from "./inputHandlers.js";

export default new Map([

    ["rotateLeft", {
        InputHandler:inputHandlers.Rotate,
        Keybinds:[
            "a",
            "ArrowLeft"
        ]
    }],

    ["rotateRight", {
        InputHandler:inputHandlers.Rotate,
        Keybinds:[
            "d",
            "ArrowRight"
        ]
    }],

    ["primaryAction", {
        InputHandler:inputHandlers.PrimaryAction,
        Keybinds:[
            " ",
        ]
    }],

])