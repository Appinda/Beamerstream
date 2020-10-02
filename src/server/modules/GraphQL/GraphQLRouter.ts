import express from 'express';
import bodyParser from 'body-parser';
import schema from './GraphQLSchema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { Server } from 'http';

class GraphQLRouter {
  private router: express.Router;
  private port: number;

  constructor(port: number) {
    this.router = express.Router();
    this.port = port;

    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.use('/graphql', bodyParser.json(), graphqlExpress({
      schema
    }));

    this.router.use('/graphiql', graphiqlExpress({
      endpointURL: '/api/graphql',
      subscriptionsEndpoint: `ws://localhost:${this.port}/api/graphql`
    }));
  }

  public setupWebsocket(server: Server) {
    new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
      server,
      path: '/api/graphql',
    });
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default GraphQLRouter