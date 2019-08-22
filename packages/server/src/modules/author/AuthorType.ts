import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions } from '../../core/connection/CustomConnectionType';
import { registerType, nodeInterface } from '../../interface/NodeInterface';

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
