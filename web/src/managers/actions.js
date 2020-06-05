import * as actionTypes from './actionTypes';

export function setPlayer(playerObj) {
    return { type: actionTypes.SET_PLAYER, playerObj };
}

export function setSearch(searchObj) {
    return { type: actionTypes.SET_SEARCH, searchObj };
}

export function setComparison(playerIds) {
    return { type: actionTypes.SET_COMPARISON, playerIds };
}
