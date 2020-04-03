import {
    LOADING,
    GET_SPORT_POSTS,
    GET_TOTAL_PAGES,
    ERROR_FETCH_DATA,
    GET_FAMILY_POSTS,
    SET_CURRENT_PAGE,
    FETCH_POSTS_SUCCESS,
    GET_POSTS_BY_LOCATION
} from '../types';

export function getAllPosts() {
    return {
        type: GET_POSTS_BY_LOCATION
    }
}

export function getSportPosts() {
    return {
        type: GET_SPORT_POSTS
    }
}

export function getFamilyPosts() {
    return {
        type: GET_FAMILY_POSTS
    }
}

export function fetchPostsSuccess(posts) {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

export function ErrorFetchData(bool) {
    return {
        type: ERROR_FETCH_DATA,
        payload: bool
    }
}

export function loading(bool) {
    return {
        type: LOADING,
        payload: bool
    }
}

export function setCurrentPage(num) {
    return {
        type: SET_CURRENT_PAGE,
        payload: num
    }
}

export function getTotalPages(num) {
    return {
        type: GET_TOTAL_PAGES,
        payload: num
    }
}