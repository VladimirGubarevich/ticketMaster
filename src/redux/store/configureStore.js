import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers/index';
import { watchFetchData } from '../sagas/postsSaga';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(watchFetchData);
  return store;
}