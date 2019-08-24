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

it('should return a book by global id', async () => {
  const book = await createRows.createBook();

  const query = `
    query Q($id: ID!) {
      book(id: $id) {
        title
        author {
          _id
          name
          age
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    id: toGlobalId('Book', book.id),
  }

  const result = await graphql(schema, query, rootValue, context, variables);
  const { data } = result;

  expect(data.book.title).toBe(book.title);
  expect(data.book.author.name).toBe(book.author.name);
  expect(data.book.author.age).toBe(book.author.age);
});

it('should return a book connection', async () => {
  const book1 = await createRows.createBook();
  const book2 = await createRows.createBook();

  const query = `
    query Q {
      books (first: 2){
        edges {
          node {
            _id
            title
            author {
              _id
              name
              age
            }
          }
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();

  const result = await graphql(schema, query, rootValue, context);
  const { edges } = result.data.books;

  expect(edges[0].node.title).toBe(book2.title);
  expect(edges[0].node.author.name).not.toBeNull();
  expect(edges[0].node.author.name).toBe(book2.author.name);
  expect(edges[0].node.author.age).not.toBeNull();
  expect(edges[0].node.author.age).toBe(book2.author.age);

  expect(edges[1].node.title).toBe(book1.title);
  expect(edges[1].node.author.name).not.toBeNull();
  expect(edges[1].node.author.name).toBe(book1.author.name);
  expect(edges[1].node.author.age).not.toBeNull();
  expect(edges[1].node.author.age).toBe(book1.author.age);
});
