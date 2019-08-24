// @flow
/* eslint-disable no-multi-assign,prefer-const */

import { User, Book, Author } from '../src/model';

export const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__).reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};

export const createUser = async (payload: Object = {}) => {
  const n = (global.__COUNTERS__.user += 1);

  return new User({
    name: `Normal user ${n}`,
    email: `user-${n}@example.com`,
    password: '123456',
    active: true,
    ...payload,
  }).save();
};

export const createAuthor = async () => {
  const n = (global.__COUNTERS__.author += 1);

  return new Author({
    name: `Author name ${n}`,
    age: n,
  }).save();
};

export const createBook = async (authorAlreadyCreated: Object = {}) => {
  const n = (global.__COUNTERS__.book += 1);

  const author = Object.keys(authorAlreadyCreated).length === 0
    ? await createAuthor()
    : authorAlreadyCreated;

  const book = await new Book({
    title: `Book title ${n}`,
    author,
  }).save();

  await Author.updateOne({ _id: author._id }, { $addToSet : { books: book } });

  return book;
};

