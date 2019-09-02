

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from 'react-navigation';

import {
  Variables,
  Disposable,
  RefetchOptions
} from 'react-relay';

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>

export type Relay = {
  hasMore: () => boolean,
  isLoading: () => boolean,
  loadMore: (
    pageSize: number,
    callback?: (error?: Error) => void,
    options?: RefetchOptions
  ) => Disposable
  refetchConnection: (
    totalCount: number,
    callback: (error?: Error) => void,
    refetchVariables?: Variables,
  ) => Disposable,
}
