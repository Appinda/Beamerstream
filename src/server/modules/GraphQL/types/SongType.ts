import { GraphQLObjectType, GraphQLNonNull, GraphQLInt } from "graphql";
import { LyricsType, SongMetaType } from ".";

export default new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    meta: { type: GraphQLNonNull(SongMetaType) },
    lyrics: { type: GraphQLNonNull(LyricsType) },
    themeid: { type: GraphQLNonNull(GraphQLInt) }
  })
});