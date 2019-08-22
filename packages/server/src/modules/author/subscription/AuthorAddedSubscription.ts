import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

import { AuthorConnection } from '../AuthorType';
import pubSub, { EVENTS } from '../../../pubSub';

const AuthorAddedPayloadType = new GraphQLObjectType({
  name: 'AuthorAddedPayload',
  fields: () => ({
    authorEdge: {
      type: AuthorConnection.edgeType,
      resolve: ({ user }) => ({
        node: user,
        cursor: offsetToCursor(user.id),
      })
    }
  })
});

const authorAddedSubscription = {
  type: AuthorAddedPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.AUTHOR.ADDED),
};

export default authorAddedSubscription;
