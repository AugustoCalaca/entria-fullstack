import Dataloader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import mongoose, { Types } from 'mongoose';
import { ConnectionArguments } from 'graphql-relay';
declare type ObjectId = mongoose.Schema.Types.ObjectId;

import AuthorModel, { IAuthor } from './AuthorModel';
import { GraphQLContext } from '../../TypeDefinition';
import { IBook } from '../book/BookModel';

export default class Author {
  id: string;
  _id: Types.ObjectId;
  name: string;
  age: number;
  books: Array<Types.ObjectId | IBook>

  constructor(data: IAuthor) {
    this.id = data._id;
    this._id = data._id;
    this.name = data.name;
    this.age = data.age;
    this.books = data.books;
  }
};

export const getLoader = () => new Dataloader((ids: ReadonlyArray<string>) => mongooseLoader(AuthorModel, ids));

const viewerCanSee = () => true; // add only auth

export const load = async (context: GraphQLContext, id: String | Object | ObjectId): Promise<Author | null> => {
  if(!id && typeof id !== 'string') {
    return null;
  }

  try {
    const data = await context.dataloaders.AuthorLoader.load((id as string));
    return viewerCanSee ? new Author(data) : null;
  } catch(err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) => dataloaders.AuthorLoader.clear(id.toHexString());
export const primeCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId, data: IAuthor) => dataloaders.AuthorLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: IAuthor) => clearCache(context, id) && primeCache(context, id, data);

type AuthorArgs = ConnectionArguments & {
  search?: string
};

export const loadAuthors = async (context: GraphQLContext, args: AuthorArgs) => {
  const where = args.search
    ? {
        name: {
          $regex: new RegExp(`^${args.search}`, 'ig')
        }
      }
    : {};

  const authors = AuthorModel
      .find(where, { _id: 1 })
      .sort({ createdAt: -1 })

  return connectionFromMongoCursor({
    cursor: authors,
    context,
    args,
    loader: load
  });
};
