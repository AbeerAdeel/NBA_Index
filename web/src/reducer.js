import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import playerReducer from './managers/reducer';

export default combineReducers({
    form: formReducer,
    PlayerStore: playerReducer
});
