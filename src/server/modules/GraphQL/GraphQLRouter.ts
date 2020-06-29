import express from 'express';
import bodyParser from 'body-parser';
// import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
// import { makeExecutableSchema } from 'graphql-tools';

// import GraphQLExecutor from './GraphQLExecutor';

class GraphQLRouter {

  // private router: express.Router;
  // // private executor: GraphQLExecutor;

  // constructor() {
  //   this.router = express.Router();
  //   // this.executor = new GraphQLExecutor();
  //   this.setupRoutes();
  // }

  // private setupRoutes(): void {

  //   const books = [
  //     {
  //       title: "Harry Potter and the Sorcerer's stone",
  //       author: 'J.K. Rowling',
  //     },
  //     {
  //       title: 'Jurassic Park',
  //       author: 'Michael Crichton',
  //     },
  //   ];
    
  //   // The GraphQL schema in string form
  //   const typeDefs = `
  //     type Query { books: [Book] }
  //     type Book { title: String, author: String }
  //   `;
    
  //   // The resolvers
  //   const resolvers = {
  //     Query: { books: () => books },
  //   };
    
  //   // Put together a schema
  //   const schema = makeExecutableSchema({
  //     typeDefs,
  //     resolvers,
  //   });

  //   this.router.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

  //   // GraphiQL, a visual editor for queries
  //   this.router.use('/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }));
  // }

  // public getRouter(): express.Router {
  //   return this.router;
  // }

  // // public getExecutor(): GraphQLExecutor {
  // //   return this.executor;
  // // }

}

export default GraphQLRouter