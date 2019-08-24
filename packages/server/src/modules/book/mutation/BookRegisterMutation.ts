import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import BookModel, { IBook } from '../BookModel';
import AuthorModel from '../../author/AuthorModel';
import pubSub, { EVENTS } from '../../../pubSub';

import BookType from '../BookType';

export default mutationWithClientMutationId({
  name: 'BookRegister',
  inputFields: {
    bookAuthorName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    bookAuthorAge: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    bookTitle: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ bookAuthorName, bookAuthorAge, bookTitle }) => {
    const sameBookTitle = await BookModel.findOne({ title: bookTitle });
    if(sameBookTitle) {
      return {
        error: 'Book title already exists'
      };
    }

    let author = await AuthorModel.findOne({ name: bookAuthorName, age: bookAuthorAge });

    if(!author) {
      author = new AuthorModel({
        name: bookAuthorName,
        age: bookAuthorAge,
      });

      await author.save();
    }

    const book: IBook = new BookModel({
      author: author._id,
      title: bookTitle
    });

    await book.save();
    await AuthorModel.updateOne({ _id: author._id }, { $addToSet : { books: book._id } });
    await pubSub.publish(EVENTS.BOOK.ADDED, { BookAdded: { book } })

    return {
      book
    };
  },
  outputFields: {
    book: {
      type: BookType,
      resolve: ({ book }) => book
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
