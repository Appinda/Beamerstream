import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { LiturgyType, TransitionTypeType } from ".";

export default new GraphQLObjectType ({
  name: 'App',
  fields: () => ({
    transitionType: { type: GraphQLNonNull(TransitionTypeType) },
    liturgy: { type: GraphQLNonNull(LiturgyType) },
  })
});