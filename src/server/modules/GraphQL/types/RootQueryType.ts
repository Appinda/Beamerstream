import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLInt } from "graphql";
import { AppType, LiturgyType, SongType, TransitionTypeType, ThemeType, SongMetaType } from ".";
import data from "../Data";

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    song: {
      type: SongType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args, context) => data.songlist.find(e => e.meta.id == args.id)
    },
    songlist: {
      type: new GraphQLList(SongMetaType),
      resolve: (parent, args, context) => data.songlist
    },
    app: {
      type: new GraphQLNonNull(AppType),
      resolve: (parent, args, context) => data
    },
    liturgy: {
      type: new GraphQLNonNull(LiturgyType),
      resolve: (parent, args, context) => data.liturgy
    },
    transitionType: {
      type: new GraphQLNonNull(TransitionTypeType),
      resolve: (parent, args, context) => data.transitionType
    },
    activeSong: {
      type: SongType,
      resolve: (parent, args, context) => data.activeSong
    },
    theme: {
      type: ThemeType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args,context) => data.themes.find(e => e.meta.id == args.id)
    },
    themes: {
      type: GraphQLList(ThemeType),
      resolve: (parent, args,context) => data.themes
    }
  })
});