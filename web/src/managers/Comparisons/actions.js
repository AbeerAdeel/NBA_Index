import * as actionTypes from './actionTypes';

export function setComparison(playerIds) {
    return { type: actionTypes.SET_COMPARISON, playerIds };
}

export function resetState() {
    return { type: actionTypes.RESET_STATE }
}