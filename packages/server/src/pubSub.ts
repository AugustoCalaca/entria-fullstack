import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  USER: {
    ADDED: 'USER_ADDED',
  },
  AUTHOR: {
    ADDED: 'AUTHOR_ADDED',
  },
  BOOK: {
    ADDED: 'BOOK_ADDED',
  }
};

export default new PubSub();
