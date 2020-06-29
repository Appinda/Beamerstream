import express, { Application } from 'express';
import http from 'http';
import * as path from 'path';
// import GraphQLRouter from './modules/GraphQL/GraphQLRouter';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { execute, subscribe, GraphQLSchema } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLExecutor from './modules/GraphQL/GraphQLExecutor';


class Server {

  private port: number = -1;
  private enableRemote: boolean;
  private app: Application;
  // private graphqlRouter: GraphQLRouter = new GraphQLRouter();
  private server: http.Server;
  private schema: GraphQLSchema;
  private executor: GraphQLExecutor;

  constructor(port: number, enableRemote: boolean = true) {
    this.app = express();
    this.server = new http.Server(this.app);
    this.port = port;
    this.enableRemote = enableRemote;
    this.executor = new GraphQLExecutor();
    this.schema = this.executor.getSchema();

    this.setupRouter();
    this.setupWebsocket();
  }

  private setupRouter(): void {
    this.app.use('*', cors({ 
      origin: [`http://localhost:${this.port}`, `http://localhost:3000`] ,
      credentials: true
    }));

    this.app.use('/graphql', bodyParser.json(), graphqlExpress({
      schema: this.schema
    }));

    this.app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${this.port}/subscriptions`
    }));

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
        new SubscriptionServer({
          execute,
          subscribe,
          schema: this.schema
        }, {
          server: this.server,
          path: '/subscriptions',
        });

        resolve(connectionStr);
      });
    });
  }

  public stop(): void {
    this.server.close();
  }

}

export default Server;