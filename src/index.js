import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/reducers'

const store = createStore(rootReducer);

setInterval(() => {
    const rand = Math.random();
    if (store.getState().population < 20) {
        if (rand > 0.65) {
            store.dispatch({type: 'CREATE_HUMAN'});
        }
    }
    console.log(store.getState().serviced, store.getState().maxQueueLength, store.getState().processingTime);
    // console.log(rand, Math.round(rand));
    // console.log(store.getState().last_id, store.getState().people);
}, 1500);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
