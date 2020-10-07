import { GraphQLObjectType } from "graphql";
import { LiturgyType, SongType, TransitionTypeType } from ".";
import { SongService } from "../../DataAccess/service";
import pubsub from "../PubSub";

const songservice: SongService = new SongService();

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    activeSong: {
      type: SongType,
      resolve: async (parent, args, context) => {
        return songservice.getSong(parent.id);
      },
      subscribe: (parent, args, context) => {
        return pubsub.asyncIterator(['ACTIVE_SONG_SET']);
      }
    },
    liturgy: {
      type: LiturgyType,
      resolve: async (parent, args, context) => {
        return parent.liturgy;
      },
      subscribe: (parent, args, context) => {
        return pubsub.asyncIterator(['LITURGY_CHANGE']);
      }
    },
    transitionType: {
      type: TransitionTypeType,
      resolve: async (parent, args, context) => {
        return parent.transitionType;
      },
      subscribe: (parent, args, context) => {
        return pubsub.asyncIterator(['TRANSITIONTYPE_CHANGE']);
      }
    }
  })
});