import { createSelector } from 'reselect';

const selectState = () => (state) => state.CompareStore;

export const selectCurrentComparison = () => createSelector(
    selectState(),
    (state) => state
);
