import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import thoughtsReducer from '../reducers/thoughts';
import filtersReducer from '../reducers/filters';
import userReducer from '../reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
      thoughts: thoughtsReducer,
      filters: filtersReducer,
      user: userReducer
    }),
    applyMiddleware(thunk)
  );

  return store;
};
