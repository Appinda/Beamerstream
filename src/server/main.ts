import {app, BrowserWindow} from 'electron';
import Server from './Server';
import { SongService } from './modules/DataAccess/service';
import path from 'path';
import fs from 'fs';
import RuntimeArgs from "./RuntimeArgs";
import MainWindow from './views/MainWindow';
import AppWindow from './views/AppWindow';

class Main {

  private mainWindow: AppWindow;
  private server: Server;

  // ============================================
  //                    HELPERS
  // ============================================

  private async getDataDir(): Promise<string> {
    const isDev = require('electron-is-dev');
    let datadir = isDev ? process.cwd() : app.getPath("userData");
    datadir = path.join(datadir, '/data')
    try{
      await fs.promises.access(datadir);
    }catch(e){
      await this.initDataDir(datadir);
    }
    return datadir;
  }

  private async initDataDir(datadir): Promise<void>{
    console.log(`Creating data directory in ${datadir}...`);
    await fs.promises.mkdir(path.join(datadir, '/songs'));
    await fs.promises.mkdir(path.join(datadir, '/themes'));
    await fs.promises.mkdir(path.join(datadir, '/services'));
  }
  
  private async preload(): Promise<void> {
    const datadir = await this.getDataDir();
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

  private async createWindowsWhenReady(baseUrl: string): Promise<void> {
    await app.whenReady();
    this.createWindows(baseUrl);

    app.once('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) this.createWindows(baseUrl)
    })
  }

  private createWindows(baseUrl: string){
    this.mainWindow = new MainWindow(baseUrl);
    this.mainWindow.showWhenReady();
  }

  // ============================================
  //                    SERVER
  // ============================================

  private async run(args): Promise<void> {
    await this.preload();

    let enableRemote: boolean = !!args["remote"];
    if(enableRemote) { console.log("Remote enabled by --remote parameter"); }
    this.server = new Server(args.port, enableRemote);
  
    // Express
    let conectionStr = await this.server.start();
    console.log(`Beamerstream Server listening at ${conectionStr}`);
  
    const url = `http://localhost:${args.devport||args.port}`;

    // Electron
    if(!args.headless) {
      this.createWindowsWhenReady(url);
    } else {
      console.log("Windows GUI disabled by --headless parameter")
    }
  }

  // ============================================
  //                    MAIN
  // ============================================

  constructor(){
    const args = RuntimeArgs.get();

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit()
    });

    this.run(args);
  }
}

new Main();
