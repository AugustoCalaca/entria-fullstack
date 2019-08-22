import Dataloader from 'dataloader';

import { IUser } from './modules/user/UserModel';
import { IAuthor } from './modules/author/AuthorModel';
import { IBook } from './modules/book/BookModel';

type Key = string;

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>;
  AuthorLoader: Dataloader<Key, IAuthor>;
  BookLoader: Dataloader<Key, IBook>;
};

export type GraphQLContext = {
  user?: IUser;
  author?: IAuthor;
  book?: IBook;
  dataloaders: Dataloaders;
};
