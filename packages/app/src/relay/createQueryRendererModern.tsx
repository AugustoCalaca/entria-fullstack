
import React from 'react';
import {
  Text,
} from 'react-native';
import {
  GraphQLTaggedNode,
  Variables,
  QueryRenderer
} from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';

import Environment from './Environment';
import Loading from '../components/Loading';

type Config = {
  query: GraphQLTaggedNode,
  queriesParams?: (props: Object) => Object,
  variables?: Variables,
  hideSplash?: boolean,
};

export default function createQueryRenderer(
  FragmentComponent: React.ComponentType<any>,
  Component: React.ComponentType<any>,
  config: Config,
): React.ComponentType<any> {
  const { query, queriesParams } = config;

  class QueryRendererWrapper extends React.Component<{}> {
    render() {
      const variables = queriesParams ? queriesParams(this.props) : config.variables;

      return (
        <QueryRenderer
          environment={Environment}
          query={query}
          variables={variables}
          render={({ error, props }) => {
            if (error) {
              return <Text>{error.toString()}</Text>;
            }

            if (props) {
              console.log('props');
              console.log(props);
              return <FragmentComponent {...this.props} query={props} />
            }

            return <Loading />
          }}
        />
        );
      }
    }

    return hoistStatics(QueryRendererWrapper, Component);
}
