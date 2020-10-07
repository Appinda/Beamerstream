import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: 'ThemeMeta',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    filename: { type: GraphQLNonNull(GraphQLString) }
  })
});