import * as actionTypes from './actionTypes';

function reducer(state = {}, action) {
    switch (action.type) {
        case actionTypes.SET_PLAYER:
            return action.playerObj
        case actionTypes.SET_SEARCH:
            return action.searchObj
        case actionTypes.RESET_STATE:
            return []
        default:
            return state;
    }
}

export default reducer;
