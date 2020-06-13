import express from 'express';
import graphqlHTTP from 'express-graphql';
import GraphQLExecutor from './GraphQLExecutor';

class GraphQLRouter {

  private router: express.Router;
  private executor: GraphQLExecutor;

  constructor() {
    this.router = express.Router();
    this.executor = new GraphQLExecutor();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.use('/', graphqlHTTP({
      schema: this.executor.getSchema(),
      rootValue: this.executor.getRoot(),
      graphiql: true,
    }));
  }

  public getRouter(): express.Router {
    return this.router;
  }

  public getExecutor(): GraphQLExecutor {
    return this.executor;
  }

}

export default GraphQLRouter