import { createSelector } from 'reselect';

const getPostsReducer = store => store.postsReducer;

export const getPostsSelector = createSelector(
    getPostsReducer, 
    store => store.posts
);

export const isLoadingSelector = createSelector(
    getPostsReducer, 
    state => state.isLoading
);

export const totalPagesSelector = createSelector(
    getPostsReducer, 
    state => state.totalPages
);

export const isErrorSelector = createSelector(
    getPostsReducer, 
    state => state.isError
);