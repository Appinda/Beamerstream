import { GraphQLSchema } from "graphql";
import { RootMutationType, RootQueryType, RootSubscriptionType } from "./types";

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
  subscription: RootSubscriptionType
});