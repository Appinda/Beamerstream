import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } from "graphql";
import assetloader from "../../AssetLoader";
import app from "../App";
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
        app.activeSong = assetloader.getSong(args.id);
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
    setTransitionType: {
      type: GraphQLBoolean,
      args: {
        display: { type: GraphQLString },
        ease: { type: GraphQLString },
      },
      resolve: (parent, args, context) => {
        if(args.display) app.transitionType.display = args.display;
        if(args.ease) {
          app.transitionType.ease = args.ease;
          switch(app.transitionType.ease){
            case "fade":
              app.transitionType.easeDuration = 2;
              break;
            default: 
              app.transitionType.easeDuration = 0;
          }
        }
        pubsub.publish('TRANSITIONTYPE_CHANGE', { transitionType: app.transitionType });
        return true;
      }
    },
  })
});