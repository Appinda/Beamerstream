import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } from "graphql";

export default new GraphQLObjectType({
  name: 'TransitionType',
  fields: () => ({
    display: { type: GraphQLNonNull(GraphQLString) },
    ease: { type: GraphQLNonNull(GraphQLString) },
    easeDuration: { type: GraphQLNonNull(GraphQLFloat) },
  })
});