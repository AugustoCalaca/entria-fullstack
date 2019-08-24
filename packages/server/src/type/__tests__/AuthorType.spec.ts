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

it('should return a author and his book connection by global id', async () => {
  const author1 = await createRows.createAuthor();
  const book1 = await createRows.createBook(author1);
  const book2 = await createRows.createBook(author1);
  const book3 = await createRows.createBook(author1);

  const query = `
    query Q($id: ID!) {
      author(id: $id) {
        _id
        name
        age
        books(first: 3) {
          count
          edges {
            node {
              title
            }
          }
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    id: toGlobalId('Author', author1.id),
  }

  const result = await graphql(schema, query, rootValue, context, variables);
  const { author } = result.data;

  expect(author.name).toBe(author1.name);
  expect(author.age).toBe(author1.age);

  expect(author.books.edges[0].node.title).not.toBeNull();
  expect(author.books.edges[0].node.title).toBe(book3.title);

  expect(author.books.edges[1].node.title).not.toBeNull();
  expect(author.books.edges[1].node.title).toBe(book2.title);

  expect(author.books.edges[2].node.title).not.toBeNull();
  expect(author.books.edges[2].node.title).toBe(book1.title);
});

