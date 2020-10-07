import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } from "graphql";
import { SongService } from "../../DataAccess/service/";
import state from "../AppState";
import pubsub from "../PubSub";

const songservice: SongService = new SongService();

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    setActiveSong: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args, context) => {
        state.activeSong = songservice.getSong(args.id);
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
        let song = songservice.getSong(args.id);
        state.liturgy.items.push(song.meta);
        pubsub.publish('LITURGY_CHANGE', { liturgy: state.liturgy });
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
        let song = songservice.getSong(args.id);
        state.liturgy.items = state.liturgy.items.filter(e => e.id !== song.meta.id);
        pubsub.publish('LITURGY_CHANGE', { liturgy: state.liturgy });
        return true;
      }
    },
    setTransitionType: {
      type: GraphQLBoolean,
      args: {
        display: { type: GraphQLString },
        ease: { type: GraphQLString },
      },
      resolve: (parent, args, context) => {
        if(args.display) state.transitionType.display = args.display;
        if(args.ease) {
          state.transitionType.ease = args.ease;
          switch(state.transitionType.ease){
            case "fade":
              state.transitionType.easeDuration = 2;
              break;
            default: 
              state.transitionType.easeDuration = 0;
          }
        }
        pubsub.publish('TRANSITIONTYPE_CHANGE', { transitionType: state.transitionType });
        return true;
      }
    },
  })
});