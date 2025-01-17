import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions } from '../../core/connection/CustomConnectionType';
import { registerType, nodeInterface } from '../../interface/NodeInterface';

import AuthorType from '../author/AuthorType';
import AuthorModel from '../author/AuthorModel';

const BookType = registerType(
  new GraphQLObjectType({
    name: 'Book',
    description: 'Book data',
    fields: () => ({
      id: globalIdField('Book'),
      _id: {
        type: GraphQLString,
        resolve: book => book._id
      },
      author: {
        type: AuthorType,
        resolve: async book => await AuthorModel.findById(book.author)
      },
      title: {
        type: GraphQLString,
        resolve: book => book.title
      }
    }),
    interfaces: () => [nodeInterface]
  })
);

export default BookType;

export const BookConnection = connectionDefinitions({
  name: 'Book',
  nodeType: BookType
});
