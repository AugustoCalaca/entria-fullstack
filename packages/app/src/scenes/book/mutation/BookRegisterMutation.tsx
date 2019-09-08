import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';
import { Environment } from '../../../relay';

import  { BookRegisterInput, BookRegisterMutationResponse } from './__generated__/BookRegisterMutation.graphql';

const mutation = graphql`
  mutation BookRegisterMutation($input: BookRegisterInput!) {
    BookRegister(input: $input) {
      book {
        id
        title
      }
    }
  }
`;

const updateClientStore = (store: RecordSourceSelectorProxy) => {
  // Retrieve the new book from server response
  const registerBookField = store.getRootField('BookRegister');
  const newBook = registerBookField.getLinkedRecord('book');

  // Add the book to the store
  const record = store.getRoot()
  const books = ConnectionHandler.getConnection(record, 'BookList_books');

  if(books) {
    const newEdge = ConnectionHandler.createEdge(
      store,
      books,
      newBook,
      'BookEdge',
    );

    // Insert edge before all other edges
    ConnectionHandler.insertEdgeBefore(books, newEdge);
  }
}

function commit(input: BookRegisterInput, onCompleted: (response: BookRegisterMutationResponse) => void, onError: (error: Error) => void) {
  return commitMutation(Environment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
    updater: (store: RecordSourceSelectorProxy) => updateClientStore(store),
  });
}

export default { commit };
