import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: 'Verse',
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    text: { type: GraphQLNonNull(GraphQLString) },
  })
});