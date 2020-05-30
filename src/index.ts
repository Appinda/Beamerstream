import dotenv from "dotenv";
import express from "express";
import http from "http";
import https from "https";
import socketio from "socket.io";
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import AssetLoader from "./modules/AssetLoader";
import Style from "./obj/Style";

dotenv.config();
app.allowRendererProcessReuse = true;

var expressapp = express();
var server = http.createServer(expressapp);
var io = socketio(server);




let assets: AssetLoader = new AssetLoader();

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
  });

  mainWindow.loadFile(path.join(__dirname, "../public/control/index.html"));
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.maximize();
  mainWindow.show();
}

ipcMain.on("getSongs", (event) => {
  assets.getSonglist().then(songlist => {
    event.reply("sendSongs", { songs: songlist });
  });
});
ipcMain.on("getSong", (event, args: {id: string}) => {
  event.reply("sendSong", assets.getSong(args.id));
});
ipcMain.on("setText", (event, args: {text: string}) => {
  io.emit('setText', { text: args.text });
});
ipcMain.on("setStyle", (event, args: Style) => {
  io.emit('setStyle', args);
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


// ========== SERVER ==============

expressapp.get("/", (req, res) => { res.send("Working!") });
expressapp.use("/control", express.static(path.join(__dirname, "../public/control")));
expressapp.use("/output", express.static(path.join(__dirname, "../public/output")));
expressapp.use("/modules/jquery", express.static(path.join(__dirname, "../node_modules/jquery")));
expressapp.use("/modules/socket.io-client", express.static(path.join(__dirname, "../node_modules/socket.io-client")));


io.on('connection', (socket) => {
  // User connection
  console.log("A user connected.");
  // socket.on('disconnect', () => {
    // User disconnected
  // });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});