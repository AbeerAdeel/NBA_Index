import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import playerReducer from './managers/Players/reducer';
import compareReducer from './managers/Comparisons/reducer';

export default combineReducers({
    form: formReducer,
    PlayerStore: playerReducer,
    CompareStore: compareReducer,
});
