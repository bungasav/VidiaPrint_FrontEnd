import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './_helpers';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import Moment from 'react-moment';

// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
// disable ServiceWorker
// registerServiceWorker();
