import assetloader from "../AssetLoader";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  ExecutionResult,
  Source,
  GraphQLBoolean
} from 'graphql';

class GraphQLExecutor {

  private schema: GraphQLSchema;

  constructor() {
    this.setupSchemas();
  }

  private setupSchemas() {

    const Song = new GraphQLObjectType({
      name: 'Song',
      fields: () => ({
        meta: { type: SongMeta },
        lyrics: { type: Lyrics },
        themeid: { type: GraphQLNonNull(GraphQLInt) },
      })
    });
    const SongMeta = new GraphQLObjectType({
      name: 'SongMeta',
      fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        filename: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        ccli: { type: GraphQLNonNull(GraphQLString) }
      })
    });
    const Lyrics = new GraphQLObjectType({
      name: 'Lyrics',
      fields: () => ({
        order: { type: GraphQLNonNull(GraphQLString) },
        verses: { type: GraphQLList(Verse) },
      })
    });
    const Verse = new GraphQLObjectType({
      name: 'Verse',
      fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLNonNull(GraphQLString) },
      })
    });

    const Query = new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        song: {
          type: Song,
          args: {
            id: { type: GraphQLNonNull(GraphQLString) }
          },
          resolve: (obj, args) => assetloader.getSong(args.id)
        },
        songlist: {
          type: new GraphQLList(SongMeta),
          resolve: () => {
            return assetloader.getSonglist()
            .then(songlist => {
              return songlist;
            });
          }
        }
      })
    });

    const Mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        setActiveSong: {
          type: GraphQLNonNull(GraphQLBoolean),
          args: {
            id: { type: GraphQLNonNull(GraphQLString) },
          },
          resolve: (obj, args) => {
            console.log("Set active song to " + args.id);
            return true;
          }
        }
      })
    });
    
    this.schema = new GraphQLSchema({
      query: Query,
      mutation: Mutation
    })
  }

  public getSchema(): GraphQLSchema {
    return this.schema;
  }

  public execute(query: string | Source): Promise<ExecutionResult<{ [key: string]: any; }>> {
    return graphql(this.schema, query)
      .then((response) => {
        return response;
      })
  }

}

export default GraphQLExecutor