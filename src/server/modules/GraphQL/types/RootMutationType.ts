import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } from "graphql";
import assetloader from "../../AssetLoader";
import data from "../Data";
import pubsub from "../PubSub";

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    setActiveSong: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args, context) => {
        data.activeSong = assetloader.getSong(args.id);
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
        data.liturgy.items.push(song.meta);
        pubsub.publish('LITURGY_CHANGE', { liturgy: data.liturgy });
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
        data.liturgy.items = data.liturgy.items.filter(e => e.id !== song.meta.id);
        pubsub.publish('LITURGY_CHANGE', { liturgy: data.liturgy });
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
        if(args.display) data.transitionType.display = args.display;
        if(args.ease) {
          data.transitionType.ease = args.ease;
          switch(data.transitionType.ease){
            case "fade":
              data.transitionType.easeDuration = 2;
              break;
            default: 
              data.transitionType.easeDuration = 0;
          }
        }
        pubsub.publish('TRANSITIONTYPE_CHANGE', { transitionType: data.transitionType });
        return true;
      }
    },
  })
});