// external imports
import { GraphQLObjectType } from 'graphql';

import UserSubscriptions from '../modules/user/subscription';
import AuthorSubscriptions from '../modules/author/subscription';
import BookSubscriptions from '../modules/book/subscription';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...UserSubscriptions,
    ...AuthorSubscriptions,
    ...BookSubscriptions,
  },
});
