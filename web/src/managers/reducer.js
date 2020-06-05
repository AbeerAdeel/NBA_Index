import * as actionTypes from './actionTypes';

function reducer(state = {}, action) {
    switch (action.type) {
        case actionTypes.SET_PLAYER:
            return action.playerObj
        case actionTypes.SET_SEARCH:
            return action.searchObj
        case actionTypes.SET_COMPARISON:
            return action.playerIds
        default:
            return state;
    }
}

export default reducer;
