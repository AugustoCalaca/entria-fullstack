import Dataloader from 'dataloader';

import { IUser } from './modules/user/UserModel';
import { IBook } from './modules/book/BookModel';

type Key = string;

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>;
  BookLoader: Dataloader<Key, IBook>;
};

export type GraphQLContext = {
  user?: IUser;
  book?: IBook;
  dataloaders: Dataloaders;
};
