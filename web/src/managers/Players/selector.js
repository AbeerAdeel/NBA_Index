import { createSelector } from 'reselect';

const selectState = () => (state) => state.PlayerStore;

export const selectCurrentState = () => createSelector(
    selectState(),
    (state) => state
);
