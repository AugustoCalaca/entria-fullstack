import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField, connectionArgs } from 'graphql-relay';

import { connectionDefinitions } from '../../core/connection/CustomConnectionType';
import { registerType, nodeInterface } from '../../interface/NodeInterface';

import { BookConnection } from '../book/BookType';
import { BookLoader } from '../../loader';

const AuthorType = registerType(
  new GraphQLObjectType({
    name: 'Author',
    description: 'Author data',
    fields: () => ({
      id: globalIdField('Author'),
      _id: {
        type: GraphQLString,
        resolve: author => author._id
      },
      name: {
        type: GraphQLString,
        resolve: author => author.name
      },
      age: {
        type: GraphQLInt,
        resolve: author => author.age
      },
      books: {
        type: BookConnection.connectionType,
        args: {
          ...connectionArgs,
          search: {
            type: GraphQLString,
          },
        },
        resolve: (author, args, context) => {
          const findBooksOfAuthor = author.books;
          args = { ...args, findBooksOfAuthor }
          return BookLoader.loadBooks(context, args);
        }
      }
    }),
    interfaces: () => [nodeInterface]
  })
);

export default AuthorType;

export const AuthorConnection = connectionDefinitions({
  name: 'Author',
  nodeType: AuthorType
})
