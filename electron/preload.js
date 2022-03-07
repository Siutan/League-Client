const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    "api", { // "api" -> rename it to anything you want
        titlebar: action => {
            ipcRenderer.send("titlebar", action);
        }
    }
);