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

let app = {
  liturgy: {
    items: []
  }
}

const AppType = new GraphQLObjectType({
  name: 'App',
  fields: () => ({
    liturgy: { type: GraphQLNonNull(LiturgyType) },
  })
});
const LiturgyType = new GraphQLObjectType({
  name: 'Liturgy',
  fields: () => ({
    items: { type: GraphQLList(SongMetaType) },
  })
});
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
    },
    liturgy: {
      type: new GraphQLNonNull(LiturgyType),
      resolve: (parent, args, context) => app.liturgy
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
    },
    addToLiturgy: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args, context) => {
        // Add item to liturgy
        let song = assetloader.getSong(args.id);
        app.liturgy.items.push(song.meta);
        pubsub.publish('LITURGY_CHANGE', { liturgy: app.liturgy });
        return true;
      }
    },
    removeFromLiturgy: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args, context) => {
        // Remove item from liturgy
        let song = assetloader.getSong(args.id);
        app.liturgy.items = app.liturgy.items.filter(e => e.meta.id !== song.meta.id);
        pubsub.publish('LITURGY_CHANGE', { liturgy: app.liturgy });
        return true;
      }
    },
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
        return pubsub.asyncIterator(['ACTIVE_SONG_SET']);
      }
    },
    liturgy: {
      type: LiturgyType,
      resolve: async (parent, args, context) => {
        console.log(parent);
        return parent.liturgy;
      },
      subscribe: (parent, args, context) => {
        return pubsub.asyncIterator(['LITURGY_CHANGE']);
      }
    }
  })
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
  subscription: RootSubscriptionType
});