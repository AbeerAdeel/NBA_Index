import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import rootReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import store from './store';


render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);
