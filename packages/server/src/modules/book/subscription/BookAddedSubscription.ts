import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

import { BookConnection } from '../BookType';
import pubSub, { EVENTS } from '../../../pubSub';

const BookAddedPayloadType = new GraphQLObjectType({
  name: 'BookAddedPayload',
  fields: () => ({
    bookEdge: {
      type: BookConnection.edgeType,
      resolve: ({ book }) => ({
        cursor: offsetToCursor(book.id),
        node: book,
      }),
    },
  }),
});

const bookAddedSubscription = {
  type: BookAddedPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.BOOK.ADDED),
};

export default bookAddedSubscription;
