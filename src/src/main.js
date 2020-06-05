"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
// ============================================
//                   ELECTRON
// ============================================
function createWindow() {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        title: "Beamerstream",
        webPreferences: {
        // preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.maximize();
    mainWindow.on('ready-to-show', function () {
        mainWindow.show();
    });
}
function listen() {
    electron_1.app.whenReady().then(function () {
        createWindow();
        electron_1.app.on('activate', function () {
            if (electron_1.BrowserWindow.getAllWindows().length === 0)
                createWindow();
        });
    });
}
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
// ============================================
//                    SERVER
// ============================================
var express = require('express');
var server = express();
var port = 3000;
server.use('/', express.static(path.join(__dirname, '../wwwroot')));
server.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
    listen();
});
//# sourceMappingURL=main.js.map