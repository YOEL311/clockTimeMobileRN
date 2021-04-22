import React from 'react';
import App from './src/App';
import reducer from './src/store/reducer';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk),
  // applyMiddleware(ReduxThunk, logger)
);

const WarperApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WarperApp;
