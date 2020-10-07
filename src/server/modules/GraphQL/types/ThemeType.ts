import { GraphQLObjectType, GraphQLNonNull, GraphQLInt } from "graphql";
import { ThemeMetaType } from ".";

export default new GraphQLObjectType({
  name: 'Theme',
  fields: () => ({
    meta: { type: GraphQLNonNull(ThemeMetaType) },
    fontSize: { type: GraphQLNonNull(GraphQLInt) },
  })
});