import assetloader from "../AssetLoader";
import { makeExecutableSchema } from '@graphql-tools/schema';
import {PubSub} from 'graphql-subscriptions';

const pubsub = new PubSub();

const typeDefs = `
  type Song {
    meta: SongMeta,
    lyrics: Lyrics,
    themeid: Int!,
  }

  type SongMeta {
    id: String!,
    name: String!,
    filename: String!,
    author: String!,
    ccli: String!
  }

  type Lyrics {
    order: String!,
    verses: [Verse],
  }

  type Verse {
    name: String!,
    text: String!,
  }

  # Roots
  type Query {
    song(id: String!): [Song]
    songlist: [SongMeta]
  }

  type Mutation {
    setActiveSong (
      id: String!
    ): Boolean!
  }
  
  type Subscription {
    activeSongSet: String
  }
`;

const resolvers = {
  Query: {
    song: (obj, args) => assetloader.getSong(args.id),
    songlist: () => assetloader.getSonglist(),
  },

  Mutation: {
    setActiveSong: (obj, args) => {
      pubsub.publish('ACTIVE_SONG_SET', { activeSongSet: args.id });
      return true;
    },
  },

  Subscription: {
    activeSongSet: (obj, args) => {
      console.log("New subscription");
      return this.pubsub.asyncIterator(['ACTIVE_SONG_SET']);
    },
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});