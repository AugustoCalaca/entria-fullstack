

import { commitMutation, graphql } from 'react-relay';
import { Environment } from '../../../relay';

import  { UserLoginWithEmailInput, UserLoginWithEmailMutationResponse } from './__generated__/UserLoginWithEmailMutation.graphql';

const mutation = graphql`
  mutation UserLoginWithEmailMutation($input: UserLoginWithEmailInput!) {
    UserLoginWithEmail(input: $input) {
      error
      token
    }
  }
`;

function commit(input: UserLoginWithEmailInput, onCompleted: (response: UserLoginWithEmailMutationResponse) => void, onError: (error: Error) => void) {
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
