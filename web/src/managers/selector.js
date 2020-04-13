import { createSelector } from 'reselect';

const selectState = () => (state) => state.PlayerStore;

export const selectCurrentPlayer = () => createSelector(
    selectState(),
    (state) => state
);
