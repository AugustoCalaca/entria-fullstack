import Dataloader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import mongoose, { Types } from 'mongoose';
import { ConnectionArguments } from 'graphql-relay';
declare type ObjectId = mongoose.Schema.Types.ObjectId;

import BookModel, { IBook } from './BookModel';
import { GraphQLContext } from '../../TypeDefinition';

export default class Book {
  id: string;
  _id: Types.ObjectId;
  author: Types.ObjectId;
  title: string;

  constructor(data: IBook) {
    this.id = data._id;
    this._id = data._id;
    this.author = data.author;
    this.title = data.title
  }
};

export const getLoader = () => new Dataloader((ids: ReadonlyArray<string>) => mongooseLoader(BookModel, ids));

const viewerCanSee = () => true; // add only auth

export const load = async (context: GraphQLContext, id: string | Object | ObjectId): Promise<Book | null> => {
  if(!id && typeof id !== 'string') {
    return null;
  }

  try {
    const data = await context.dataloaders.BookLoader.load((id as string));
    return viewerCanSee() ? new Book(data) : null;
  } catch(err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) => dataloaders.BookLoader.clear(id.toString());
export const primeCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId, data: IBook) => dataloaders.BookLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: IBook) => clearCache(context, id) && primeCache(context, id, data);

type BookArgs = ConnectionArguments & {
  search?: string
};

export const loadBooks = async (context: GraphQLContext, args: BookArgs) => {
  const where = args.search
    ? {
        title: {
          $regex: new RegExp(`^${args.search}`, 'ig')
        }
      }
    : {};

  const books = BookModel
    .find(where, { _id: 1})
    .sort({ createdAt: -1 })
    .populate('author');

  return connectionFromMongoCursor({
    cursor: books,
    context,
    args,
    loader: load
  })
}
