import assetloader from "../AssetLoader";
import {PubSub} from 'graphql-subscriptions';

import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} from "graphql";

const pubsub = new PubSub();

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    meta: { type: GraphQLNonNull(SongMetaType) },
    lyrics: { type: GraphQLNonNull(LyricsType) },
    themeid: { type: GraphQLNonNull(GraphQLInt) }
  })
});
const SongMetaType = new GraphQLObjectType({
  name: 'SongMeta',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    filename: { type: GraphQLNonNull(GraphQLString) },
    author: { type: GraphQLNonNull(GraphQLString) },
    ccli: { type: GraphQLNonNull(GraphQLString) }
  })
});
const LyricsType = new GraphQLObjectType({
  name: 'Lyrics',
  fields: () => ({
    order: { type: GraphQLNonNull(GraphQLString) },
    verses: { type: GraphQLList(VerseType) },
  })
});
const VerseType = new GraphQLObjectType({
  name: 'Verse',
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    text: { type: GraphQLNonNull(GraphQLString) },
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    song: {
      type: SongType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args, context) => assetloader.getSong(args.id)
    },
    songlist: {
      type: new GraphQLList(SongMetaType),
      resolve: (parent, args, context) => assetloader.getSonglist()
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    setActiveSong: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args, context) => {
        pubsub.publish('ACTIVE_SONG_SET', { id: args.id });
        return true;
      }
    }
  })
});

const RootSubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    activeSongSet: {
      type: SongType,
      resolve: async (parent, args, context) => {
        return assetloader.getSong(parent.id);
      },
      subscribe: (parent, args, context) => {
        console.log("New subscription");
        return pubsub.asyncIterator(['ACTIVE_SONG_SET']);
      }
    }
  })
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
  subscription: RootSubscriptionType
});