
import { graphql, requestSubscription } from 'react-relay';
import Environment from '../../../relay/Environment';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';

const subscribe = () => {
  requestSubscription(Environment, {
    subscription,
    variables: {},
    updater: (store: RecordSourceSelectorProxy) => {
      // Get the notification
      const rootField = store.getRootField('BookAdded');
      const newBook = rootField
        .getLinkedRecord('bookEdge')
        .getLinkedRecord('node');

      // Add it to a connection
      const record = store.getRoot();
      const books = ConnectionHandler.getConnection(record, 'BookList_books');

      if(books) {
        const newEdge = ConnectionHandler.createEdge(
          store,
          books,
          newBook,
          'BookEdge',
        );
        ConnectionHandler.insertEdgeBefore(books, newEdge);
      }
    },
  });
};

const subscription = graphql`
  subscription BookAddedSubscription {
    BookAdded {
      bookEdge {
        node {
          id
          title
        }
      }
    }
  }
`;

export default subscribe;
