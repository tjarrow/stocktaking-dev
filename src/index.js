import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/styles.scss';
// import 'normalize.css/normalize.css';
import Scheme from './components/Scheme';
import AppRouter from './routers/AppRouter';
import App from './App';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AppRouter/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
