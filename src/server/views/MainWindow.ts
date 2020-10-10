import {App, BrowserWindow} from "electron";
import AppWindow from "./AppWindow";

export default class MainWindow implements AppWindow {

  private window: BrowserWindow;

  constructor(url: string){
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      title: "Beamerstream",
      webPreferences: {
        // preload: path.join(__dirname, 'preload.js')
      }
    });
  
    this.window.loadURL(url);
    this.window.maximize();
  }

  public async showWhenReady(): Promise<void> {
    return new Promise(resolve => {
      this.window.on('ready-to-show', () => {
        this.show();
        resolve();
      })
    });
  }

  public show(){
    this.window.show();
  }

  public close(): void {
    this.window.close();
  }

  public destroy(): void {
    this.window.destroy();
  }
}