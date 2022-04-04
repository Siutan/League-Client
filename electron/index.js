const { app, BrowserWindow, ipcMain } = require("electron");
const { join } = require("path");
const fs = require("fs");

// check if app is running in development mode
const isDev = !app.isPackaged;

app.whenReady().then(() => {
  const win = new BrowserWindow({
    minWidth: 1600,
    minHeight: 900,
    maxWidth: 1600,
    maxHeight: 900,
    frame: false,
    webPreferences: {
      preload: join(__dirname + "/preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  // join path to index.html
  win.loadFile(join(__dirname + "/../public/index.html"));

  // show main window when ready
  win.on("ready-to-show", () => {
    win.show();
  });
  // open dev tools if in development mode
  if (isDev) {
    win.webContents.openDevTools();
    console.log(app.getPath("userData"));
  }
});

// titlebar actions
ipcMain.on("titlebar", (event, arg) => {
  if (arg === "destroy") window.destroy();
  else if (arg === "kill") app.quit(); // send quit signal to app
  else if (arg === "minimize")
    window.minimize(); // send minimize signal to window
  else if (arg === "maximize")
    window.maximize(); // send maximize signal to window
  else if (arg === "unmaximize")
    window.unmaximize(); // send unmaximize signal to window
  else if (arg === "resize") {
    if (window.isMaximized())
      window.unmaximize(); //check if window is maximized, if so, unmaximize
    else window.maximize(); // if not, maximize
  }
});

let configPath = app.getPath("userData") + "\\savedData.json";

ipcMain.handle("getPath", () => {
  return fs.readFileSync(configPath, "utf8");
});

ipcMain.on("save-file", (ev, options) => {
  fs.writeFileSync(configPath, options);
  console.log(options);
});
