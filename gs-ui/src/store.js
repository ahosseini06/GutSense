import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { gutsenseApi } from './services/gutsense'
import reducers from './redux/reducers';
import rootSaga from './redux/sagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const localStorageMiddleware = ({ getState }) => { // <--- FOCUS HERE
  return (next) => (action) => {
    const result = next(action);
    if (getState().theme.Layout) {
      localStorage.setItem('applicationState2', JSON.stringify(
        getState().theme.Layout
      ));
    }
    return result;
  };
};


const reHydrateStore = () => { // <-- FOCUS HERE

  if (localStorage.getItem('applicationState2') !== null) {
    return { theme: { Layout: JSON.parse(localStorage.getItem('applicationState2')) } } // re-hydrate the store
  }
}

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [gutsenseApi.reducerPath]: gutsenseApi.reducer,
    theme: reducers
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([gutsenseApi.middleware, sagaMiddleware, localStorageMiddleware]),

  preloadedState: reHydrateStore()
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

sagaMiddleware.run(rootSaga);



