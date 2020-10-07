import { GraphQLObjectType, GraphQLList } from "graphql";
import SongMetaType from "./SongMetaType";

export default new GraphQLObjectType({
  name: 'Liturgy',
  fields: () => ({
    items: { type: GraphQLList(SongMetaType) },
  })
});