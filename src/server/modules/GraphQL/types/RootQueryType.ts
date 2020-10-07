import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLInt } from "graphql";
import { LiturgyType, SongType, TransitionTypeType, ThemeType, ThemeMetaType, SongMetaType } from ".";
import { SongService, ThemeService } from "../../DataAccess/service";
import state from "../AppState";

const songservice: SongService = new SongService();
const themeservice: ThemeService = new ThemeService();

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    song: {
      type: SongType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args, context) => songservice.getSong(args.id)
    },
    songlist: {
      type: new GraphQLList(SongMetaType),
      resolve: (parent, args, context) => songservice.getSonglist()
    },
    liturgy: {
      type: new GraphQLNonNull(LiturgyType),
      resolve: (parent, args, context) => state.liturgy
    },
    transitionType: {
      type: new GraphQLNonNull(TransitionTypeType),
      resolve: (parent, args, context) => state.transitionType
    },
    activeSong: {
      type: SongType,
      resolve: (parent, args, context) => state.activeSong
    },
    theme: {
      type: ThemeType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args,context) => themeservice.getSong(args.id)
    },
    themes: {
      type: GraphQLList(ThemeMetaType),
      resolve: (parent, args,context) => themeservice.getSonglist()
    }
  })
});