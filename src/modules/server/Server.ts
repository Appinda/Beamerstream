import express, { Application } from 'express';
import http from 'http';

class Server {

  private app: Application;
  private server: http.Server;
  private port: number;

  constructor(port: number){
    this.app = express();
    this.port = port; 
    console.log(this.port);
    this.setupRouter();   
  }

  private setupRouter(): void {
    this.app.get('/', (req, res) => res.send('Beamerstream server is running.'))
  }

  public getPort(): number { return this.port; }

  public async start(): Promise<void> {
    this.server = this.app.listen(this.port, () => { return; });
  }
  public stop(): void {
    this.server.close();
  }
}

export default Server;
