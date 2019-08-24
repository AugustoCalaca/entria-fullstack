import { GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay';

import AuthorModel from '../AuthorModel';
import pubSub, { EVENTS } from '../../../pubSub';

export default mutationWithClientMutationId({
  name: 'AuthorRegister',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  mutateAndGetPayload: async({ name, age }) => {
    let author = await AuthorModel.findOne({ name, age });

    if(author) {
      return {
        error: 'Author already exists'
      };
    }

    author = new AuthorModel({ name, age });
    await author.save();

    await pubSub.publish(EVENTS.AUTHOR.ADDED, { AuthorAdded: { author } })

    return {
      name: author.name,
      age: author.age
    };
  },
  outputFields: {
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name
    },
    age: {
      type: GraphQLInt,
      resolve: ({ age }) => age
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
