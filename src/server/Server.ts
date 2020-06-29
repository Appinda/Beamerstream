import express, { Application } from 'express';
import http from 'http';
import * as path from 'path';
import { createServer } from 'http';
import CorsFilter from './modules/CorsFilter';
import GraphQLRouter from './modules/GraphQL/GraphQLRouter';


class Server {

  private port: number = -1;
  private enableRemote: boolean;
  private app: Application;
  private graphqlRouter: GraphQLRouter;
  private server: http.Server;

  constructor(port: number, enableRemote: boolean = true) {
    this.app = express();
    this.server = new http.Server(this.app);
    this.port = port;
    this.enableRemote = enableRemote;

    this.graphqlRouter = new GraphQLRouter(this.port);

    this.setupRouter();
    this.setupWebsocket();
  }

  private setupRouter(): void {
    this.app.use('*', CorsFilter);
    this.app.use('/api', this.graphqlRouter.getRouter())
    this.app.use('/', express.static(path.join(__dirname, '../wwwroot')));
  }

  private setupWebsocket(): void {

    this.server = createServer(this.app);
  }

  public getPort(): number { return this.port; }

  public start(): Promise<string> {
    return new Promise<string>((resolve) => {
      let host = this.enableRemote ? '0.0.0.0' : '127.0.0.1';
      let connectionStr = host + ":" + this.port;
      this.server.listen(this.port, host, () => {
        console.log("Server running!");
        
        this.graphqlRouter.setupWebsocket(this.server);

        resolve(connectionStr);
      });
    });
  }

  public stop(): void {
    this.server.close();
  }

}

export default Server;