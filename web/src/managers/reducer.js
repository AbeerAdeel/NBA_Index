import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

function reducer(state = {}, action) {
    switch (action.type) {
        case actionTypes.SET_PLAYER:
            return action.playerObj
        default:
            return state;
    }
}

export default reducer;
