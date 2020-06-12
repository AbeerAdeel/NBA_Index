import * as actionTypes from './actionTypes';

function reducer(state = [], action) {
    switch (action.type) {
        case actionTypes.SET_COMPARISON:
            return action.playerIds
        case actionTypes.RESET_STATE:
            return []
        default:
            return state;
    }
}

export default reducer;
