import express, { Application } from 'express';
import http from 'http';
import socketio from 'socket.io';
import * as path from 'path';
import GraphQLRouter from './modules/GraphQL/GraphQLRouter';

class Server {

  private port: number = -1;
  private isPublic: boolean;
  private io: socketio.Server;
  private app: Application;
  private server: http.Server;
  private graphqlRouter: GraphQLRouter = new GraphQLRouter();

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);
    this.io = socketio(this.server);

    this.setupRouter();
    this.setupWebsocket();
  }

  private setupRouter(): void {
    this.app.use('/api', this.graphqlRouter.getRouter())
    this.app.use('/', express.static(path.join(__dirname, '../wwwroot')));
  }

  private setupWebsocket(): void {

    this.io.on('connection', (socket) => {
      console.log('A user connected to websocket');

      socket.on('api', (query) => {
        console.log("API Request");
        this.graphqlRouter.getExecutor().execute(query)
        .then(({data}) => {
          socket.emit('api', data);
        });
      });
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  }

  public getPort(): number { return this.port; }

  public start(port: number, isPublic: boolean = true): Promise<string> {
    return new Promise<string>((resolve) => {
      this.port = port;
      this.isPublic = isPublic;
      let host = isPublic ? '0.0.0.0' : '127.0.0.1';
      let connectionStr = host + ":" + port;
      this.server.listen(this.port, host, () => {
        resolve(connectionStr);
      });
    });
  }

  public stop(): void {
    this.server.close();
  }

}

export default Server;