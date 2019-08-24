import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import { schema } from '../../schema';
import {
  getContext,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  createRows,
} from '../../../test/helper';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should load User', async () => {
  const user = await createRows.createUser();

  // language=GraphQL
  const query = `
    query Q($id: ID!) {
      node(id: $id) {
        id
        ... on User {
          name
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    id: toGlobalId('User', user.id),
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  expect(result.data.node.id).toBe(variables.id);
  expect(result.data.node.name).toBe(user.name);
});

it('should load Book', async () => {
  const book = await createRows.createBook();

  // language=GraphQL
  const query = `
    query Q($id: ID!) {
      node(id: $id) {
        id
        ... on Book {
          title
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    id: toGlobalId('Book', book.id),
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  const { node } = result.data;

  expect(node.id).toBe(variables.id);
  expect(node.title).toBe(book.title);

});

it('should load Author', async () => {
  const author = await createRows.createAuthor();

  // language=GraphQL
  const query = `
    query Q($id: ID!) {
      node(id: $id) {
        id
        ... on Author {
          name
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    id: toGlobalId('Author', author.id),
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  const { node } = result.data;

  expect(node.id).toBe(variables.id);
  expect(node.name).toBe(author.name);
});
