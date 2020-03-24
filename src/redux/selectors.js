export const getPostsSelector = store => {
    return store.posts.posts;
}

export const isLoadingSelector = store => {
    return store.posts.isLoading;
}

export const totalPagesSelector = store => {
    return store.posts.totalPages;
}

export const locationSelector = store => {
    return store.search.location;
}

export const familyFilterSelector = store => {
    return store.search.searchFamily;
}

export const sportsFilterSelector = store => {
    return store.search.searchSports;
}