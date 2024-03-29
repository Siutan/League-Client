const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // "api" -> rename it to anything you want
  titlebar: (action) => {
    ipcRenderer.send("titlebar", action);
  },
});

// file read api
contextBridge.exposeInMainWorld("electronAPI", {
  getPath: () => ipcRenderer.invoke("getPath"),
  writeToFile: (options) => ipcRenderer.send("writeToFile", options),

  openApp: (game) => ipcRenderer.send("openApp", game),
});
