import { createSelector } from 'reselect';

export const getSearchReducer = store => store.searchReducer;

export const locationSelector = createSelector(
    getSearchReducer,
    store => store.location
);

export const familyFilterSelector = createSelector(
    getSearchReducer,
    store => store.searchInCategoryFamily
);

export const sportsFilterSelector = createSelector(
    getSearchReducer,
    store => store.searchInCategorySports
);

