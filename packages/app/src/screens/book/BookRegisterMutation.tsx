import { commitMutation, graphql } from 'react-relay';
import { Environment } from '../../relay';

import  { BookRegisterInput, BookRegisterMutationResponse } from './__generated__/BookRegisterMutation.graphql';

const mutation = graphql`
  mutation BookRegisterMutation($input: BookRegisterInput!) {
    BookRegister(input: $input) {
      book {
        title
      }
    }
  }
`;

function commit(input: BookRegisterInput, onCompleted: (response: BookRegisterMutationResponse) => void, onError: (error: Error) => void) {
  return commitMutation(Environment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  });
}

export default { commit };
