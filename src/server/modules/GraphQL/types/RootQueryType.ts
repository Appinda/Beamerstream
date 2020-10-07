import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLInt } from "graphql";
import { AppType, LiturgyType, SongType, TransitionTypeType } from ".";
import assetloader from "../../AssetLoader";
import SongMetaType from "./SongMetaType";
import app from "../App";

export default new GraphQLObjectType({
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
    app: {
      type: new GraphQLNonNull(AppType),
      resolve: (parent, args, context) => app
    },
    liturgy: {
      type: new GraphQLNonNull(LiturgyType),
      resolve: (parent, args, context) => app.liturgy
    },
    transitionType: {
      type: new GraphQLNonNull(TransitionTypeType),
      resolve: (parent, args, context) => app.transitionType
    },
    activeSong: {
      type: SongType,
      resolve: (parent, args, context) => app.activeSong
    }
  })
});