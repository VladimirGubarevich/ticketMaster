export function getPosts(val) {
    return {
        type: 'GET_POSTS',
        payload: val
    }
}

export function fetchPostsSuccess(posts) {
    return {
        type: 'FETCH_POSTS_SUCCESS',
        payload: posts
    }
}

export function ErrorFetchData(bool) {
    return {
        type: 'ERROR_FETCH_DATA',
        payload: bool
    }
}

export function loading(bool) {
    return {
        type: 'LOADING',
        payload: bool
    }
}