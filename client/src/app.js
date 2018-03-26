import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addThought } from './actions/thoughts';
import ThoughtsApp from './components/ThoughtsApp';
import 'normalize.css/normalize.css'
import css from './styles/app.scss';

const store = configureStore();

// store.dispatch(addThought({ text: 'test thought' }));

const state = store.getState();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));



