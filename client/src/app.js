import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import ThoughtsApp from './components/ThoughtsApp';
import 'normalize.css/normalize.css'
import css from './styles/app.scss';

ReactDOM.render(<ThoughtsApp />, document.getElementById('app'));