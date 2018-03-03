import { createStore, combineReducers } from 'redux';
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
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
