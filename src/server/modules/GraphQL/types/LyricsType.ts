import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";
import { VerseType } from ".";

export default new GraphQLObjectType({
  name: 'Lyrics',
  fields: () => ({
    order: { type: GraphQLNonNull(GraphQLString) },
    verses: { type: GraphQLList(VerseType) },
  })
});