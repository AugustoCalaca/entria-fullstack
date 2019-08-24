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

it('should not register book with an existing title', async () => {
  const book = await createRows.createBook();

  // language=GraphQL
  const query = `
    mutation M($input: BookRegisterInput!) {
      BookRegister(input: $input) {
        book {
          title
          author {
            name
            age
          }
        }
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    input: {
      bookAuthorName: 'Author Name',
      bookAuthorAge: 1,
      bookTitle: book.title
    }
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  const { BookRegister } = result.data;

  expect(BookRegister.book).toBeNull();
  expect(BookRegister.error).toBe('Book title already exists');
});

it('should create a new book when parameters are valid', async () => {

  // language=GraphQL
  const query = `
    mutation M($input: BookRegisterInput!) {
      BookRegister(input: $input) {
        book {
          title
          author {
            name
            age
          }
        }
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    input: {
      bookAuthorName: 'Author Name',
      bookAuthorAge: 1,
      bookTitle: 'Book title'
    }
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  const { BookRegister } = result.data;

  expect(BookRegister.error).toBeNull();

  expect(BookRegister.book).not.toBeNull();
  expect(BookRegister.book.title).toBe('Book title');

  expect(BookRegister.book.author).not.toBeNull();
  expect(BookRegister.book.author.name).toBe('Author Name');
  expect(BookRegister.book.author.age).toBe(1);
});
