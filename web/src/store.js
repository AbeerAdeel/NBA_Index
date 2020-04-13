import { createStore } from 'redux';
import rootReducer from './reducer';

function saveToLocalStorage(state) {
    try {
        console.log('hello');
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        console.log("state", serializedState);
        if (serializedState === null) return undefined
        return JSON.parse(serializedState);
    }
    catch (e) {
        return undefined;
    }
};

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;