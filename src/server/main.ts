import {app, BrowserWindow} from 'electron';
import Server from './Server';
import yargs from 'yargs';
import { SongService } from './modules/DataAccess/service';
import path from 'path';
import fs from 'fs-extra';

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

async function getDataDir(): Promise<string> {
  const isDev = require('electron-is-dev');
  const currentDir = isDev ? process.cwd() : path.dirname(process.execPath);
  const datadir = path.join(currentDir, '/data');
  let exists = await fs.pathExists(datadir);
  if(!exists) throw new Error("Data path does not exists.");
  return datadir;
}

async function preload(): Promise<void> {
  const datadir = await getDataDir();
  console.log(datadir)
  console.log("Preload initiated");
  console.log("Loading assets..");
  let songservice = new SongService();
  try{
    await songservice.preload(datadir);
  }catch(e){
    console.error(e);
  }
  console.log("Loading assets..DONE");
}

// ============================================
//                   ELECTRON
// ============================================

function createWindow (): void {
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
});


// ============================================
//                    SERVER
// ============================================

(async () => {
  await preload();

  let enableRemote: boolean = !!argv["remote"];
  if(enableRemote) { console.log("Remote enabled by --remote parameter"); }

  const server = new Server(argv.port, enableRemote);

  // Express

  let conectionStr = await server.start();
  console.log(`Beamerstream Server listening at ${conectionStr}`);

  // Electron
  if(!argv.headless) {
    createWindowWhenReady();
  } else {
    console.log("Windows GUI disabled by --headless parameter")
  }
})();
