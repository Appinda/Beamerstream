import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import Server from './Server';
import yargs from 'yargs';
import assetLoader from './modules/AssetLoader';
import { isInterfaceType } from 'graphql';

const argv = 
yargs
.group(['headless', 'private', 'port'], 'Run')
.option('headless', {
  alias: 'h',
  type: 'boolean',
  description: 'Run without OS interface'
})
.option('private', {
  type: 'boolean',
  description: 'Run without public server'
})
.option('port', {
  alias: 'p',
  type: 'number',
  description: 'Run on other port',
  default: 3000
})
.group('devport', 'Development')
.option('devport', {
  alias: 'dp',
  type: 'number',
  description: 'Run on other port',
})
.argv;

// ============================================
//                    HELPERS
// ============================================

async function preload () {
  console.log("Preload initiated");
  console.log("Loading assets..");
  await Promise.all([
    assetLoader.preloadSongs()
  ]);
  console.log("Loading assets..DONE");
}

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

  const url = `http://localhost:${argv.devport||argv.port}`;

  mainWindow.loadURL(url);
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

(async () => {

  await preload();

  // Express
  let isPublic = !argv["private"];
  if(!isPublic) { console.log("Public server disabled by --private parameter"); }

  let conectionStr = await server.start(argv.port, isPublic);
  console.log(`Beamerstream Server listening at ${conectionStr}`);

  // Electron
  if(!argv.headless) {
    createWindowWhenReady();
  } else {
    console.log("Windows GUI disabled by --headless parameter")
  }
})();
