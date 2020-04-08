import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import rootReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
// import userSaga from 'managers/UserManager/saga';
// import eventSaga from 'managers/EventManager/saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware)),
);

// sagaMiddleware.run(userSaga);
// sagaMiddleware.run(eventSaga);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
