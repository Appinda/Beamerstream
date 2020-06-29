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
import {PubSub} from 'graphql-subscriptions';

class GraphQLExecutor {

  private schema: GraphQLSchema;
  private pubsub: PubSub

  constructor() {
    this.pubsub = new PubSub();

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
            this.pubsub.publish('ACTIVE_SONG_SET', { activeSongSet: args.id });
            return true;
          }
        }
      })
    });

    const Subscription = new GraphQLObjectType({
      name: 'Subscription',
      fields: () => ({
        activeSongSet: {
          type: GraphQLString,
          subscribe: (obj, args) => {
            console.log("New subscription");
            return this.pubsub.asyncIterator(['ACTIVE_SONG_SET']);
          }
        }
      })
    });
    
    this.schema = new GraphQLSchema({
      query: Query,
      mutation: Mutation,
      subscription: Subscription
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