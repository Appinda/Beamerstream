import express from 'express';
import bodyParser from 'body-parser';
import GraphQLExecutor from './GraphQLExecutor';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';
import { GraphQLSchema, execute, subscribe } from 'graphql';
import { Server } from 'http';

class GraphQLRouter {
  private router: express.Router;
  private executor: GraphQLExecutor;
  private schema: GraphQLSchema;
  private port: number;

  constructor(port: number) {
    this.router = express.Router();
    this.port = port;
    this.executor = new GraphQLExecutor();

    this.schema = this.executor.getSchema();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.use('/graphql', bodyParser.json(), graphqlExpress({
      schema: this.schema
    }));

    this.router.use('/graphiql', graphiqlExpress({
      endpointURL: '/api/graphql',
      subscriptionsEndpoint: `ws://localhost:${this.port}/api/graphqlws`
    }));
  }

  public setupWebsocket(server: Server) {
    new SubscriptionServer({
      execute,
      subscribe,
      schema: this.executor.getSchema()
    }, {
      server,
      path: '/api/graphqlws',
    });
  }

  public getRouter(): express.Router {
    return this.router;
  }

  public getExecutor(): GraphQLExecutor {
    return this.executor;
  }
}

export default GraphQLRouter