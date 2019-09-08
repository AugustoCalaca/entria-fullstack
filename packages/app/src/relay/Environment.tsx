
/* global __DEV__ */
import { installRelayDevTools } from 'relay-devtools';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import cacheHandler from './cacheHandler';

if (__DEV__) {
  installRelayDevTools();
}

const GRAPHQL_URL_SUBSCRIPTION = 'wss://192.168.0.107:5000/subscriptions';

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text
  const subscriptionClient = new SubscriptionClient(GRAPHQL_URL_SUBSCRIPTION, { reconnect: true })

  const onNext = (result) => {
    observer.onNext(result)
  }
  const onError = (error) => {
    observer.onError(error)
  }
  const onComplete = () => {
    observer.onCompleted()
  }

  const client = subscriptionClient
    .request({ query, variables })
    .subscribe(onNext, onError, onComplete)

  // Return a dispose method to be able to unsubscribe and trigger closing the
  // socket connection
  return {
    dispose: () => {
      // unsubscribe and close this socket connection
      client.unsubscribe()
      subscriptionClient.close()
    },
  }
}

const network = Network.create(
  __DEV__ ? RelayNetworkLogger.wrapFetch(cacheHandler) : cacheHandler,
  setupSubscription,
);

const source = new RecordSource();
const store = new Store(source);

// export const inspector = new RecordSourceInspector(source);

const env = new Environment({
  network,
  store,
});

export default env;
