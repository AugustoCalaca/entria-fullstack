

import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutation';
import AuthorMutations from '../modules/author/mutation';
import BookMutations from '../modules/book/mutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...AuthorMutations,
    ...BookMutations
  }),
});
