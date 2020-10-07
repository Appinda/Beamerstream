import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: 'SongMeta',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    filename: { type: GraphQLNonNull(GraphQLString) },
    author: { type: GraphQLNonNull(GraphQLString) },
    ccli: { type: GraphQLNonNull(GraphQLString) }
  })
});