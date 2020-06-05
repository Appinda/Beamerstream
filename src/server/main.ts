import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import Server from './Server';

// ============================================
//                   ELECTRON
// ============================================

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  })
}

function listen(){
  app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


// ============================================
//                    SERVER
// ============================================

const server = new Server();
const port = 3000;
(async () => {
  await server.start(port);
  console.log(`Example app listening at http://localhost:${port}`);
  listen();
})();
