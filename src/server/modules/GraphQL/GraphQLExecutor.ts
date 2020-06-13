import AssetLoader from "../AssetLoader";
import { buildSchema, GraphQLSchema, graphql, ExecutionResult, Source } from "graphql";

class GraphQLExecutor {

  public schema: GraphQLSchema
  public root: unknown;

  constructor() {
    this.setupSchemas();
  }

  private setupSchemas() {
    this.schema = buildSchema(`
    type Query {
      songlist: [SongMeta]
      song(id: String!): Song
      themes: [Theme]
      theme(id: String!): Theme
    }

    type Song {
      meta: SongMeta!,
      lyrics: Lyrics!,
      themeid: Int!
    }

    type SongMeta {
      id: String!
      name: String!
      filename: String!
      author: String!
      ccli: String!
    }

    type Lyrics {
      order: String!
      verses: [Verse]
    }

    type Verse {
      name: String
      text: String
    }

    type Theme {
      id: Int!
      name: String!
    }
  `);

    // The root provides a resolver function for each API endpoint

    let loader: AssetLoader = new AssetLoader();

    this.root = {
      songlist: () => {
        return loader.getSonglist();
      },
      song: (args) => {
        return loader.getSong(args.id);
      },
      themes: () => {
        return [{ id: 1, name: "Theme" }];
      },
      theme: (args) => {
        return { id: args.id, name: "Theme" };
      }
    };
  }

  public getSchema(): GraphQLSchema {
    return this.schema;
  }
  public getRoot(): unknown {
    return this.root;
  }

  public execute(query: string | Source): Promise<ExecutionResult<{ [key: string]: any; }>> {
    return graphql(this.schema, query, this.root)
      .then((response) => {
        return response;
      })
  }

}

export default GraphQLExecutor