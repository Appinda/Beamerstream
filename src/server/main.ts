import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import Server from './Server';
import yargs from 'yargs';

const argv = 
yargs
.option('headless', {
  alias: 'h',
  type: 'boolean',
  description: 'Run without OS interface'
})
.option('private', {
  alias: 'p',
  type: 'boolean',
  description: 'Run without public server'
})
.argv;

console.log(argv);

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

function createWindowWhenReady(){
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

  // Express
  let isPublic = argv["private"] == null;
  if(!isPublic) { console.log("Public server disabled by --private parameter"); }

  let conectionStr = await server.start(port, isPublic);
  console.log(`Beamerstream Server listening at ${conectionStr}`);

  // Electron
  if(!argv.headless) {
    createWindowWhenReady();
  } else {
    console.log("Windows GUI disabled by --headless parameter")
  }
})();
