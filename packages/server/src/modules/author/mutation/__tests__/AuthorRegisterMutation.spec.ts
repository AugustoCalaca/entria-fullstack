import { graphql } from 'graphql';

import { schema } from '../../../../schema';
import {
  getContext,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  createRows,
} from '../../../../../test/helper';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should not register author with same name and age', async () => {
  const author = await createRows.createAuthor();

  // language=GraphQL
  const query = `
    mutation M($input: AuthorRegisterInput!) {
      AuthorRegister(input: $input) {
        name
        age
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    input: {
      name: author.name,
      age: author.age,
    }
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  const { AuthorRegister } = result.data;

  expect(AuthorRegister.name).toBeNull();
  expect(AuthorRegister.age).toBeNull();
  expect(AuthorRegister.error).toBe('Author already exists');
});

it('should create a new author when parameters are valid', async () => {

  // language=GraphQL
  const query = `
    mutation M($input: AuthorRegisterInput!) {
      AuthorRegister(input: $input) {
        name
        age
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    input: {
      name: 'Author Name',
      age: 1,
    }
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  const { AuthorRegister } = result.data;

  expect(AuthorRegister.error).toBeNull();

  expect(AuthorRegister.name).not.toBeNull();
  expect(AuthorRegister.name).toBe('Author Name');
  expect(AuthorRegister.age).not.toBeNull();
  expect(AuthorRegister.age).toBe(1);
});
