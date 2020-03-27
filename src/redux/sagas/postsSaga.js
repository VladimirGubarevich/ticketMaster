import { call, put, takeEvery, select } from 'redux-saga/effects';
import { searchSelector } from '../selectors';
import {GET_POSTS_BY_LOCATION, GET_SPORT_POSTS, GET_FAMILY_POSTS } from '../types';
import { getPostsByLocal, getSportPosts, getFamilyPosts } from '../../services/API';
import { fetchPostsSuccess, ErrorFetchData, loading, getTotalPages } from '../actions/posts.action';

function* fetchData(callback, queryStr) {
    try {
        yield put(ErrorFetchData(false));
        yield put(loading(true));
        const result = yield call(callback, ...queryStr);
        if (!result._embedded) {
            yield put(fetchPostsSuccess([]));
        } else {
            yield put(fetchPostsSuccess(result._embedded.events));
        }
        yield put(getTotalPages(result.page.totalPages));
        yield put(loading(false));
    } catch(e) {
        yield put(loading(false));
        console.error(e);
        yield put(ErrorFetchData(true));
    }
}

function* fetchAllPosts(numberPage) {
    const search = yield select(searchSelector);
    const { country, city } = search.location;
    const queryString = [country, city, numberPage.payload];
    yield fetchData(getPostsByLocal, queryString);
}

function* fetchSportPosts(numberPage) {
    const search = yield select(searchSelector);
    const { keyword, classification } = search.searchInCategorySports;
    const { country, city } = search.location;
    const queryString = [keyword, classification, country, city, numberPage.payload];
    yield fetchData(getSportPosts, queryString);
}

function* fetchFamilyPosts(numberPage) {
    const search = yield select(searchSelector);
    const { keyword, classification } = search.searchInCategoryFamily;
    const { country, city } = search.location;
    const queryString = [keyword, classification, country, city, numberPage.payload];
    yield fetchData(getFamilyPosts, queryString);
}

export function* watchFetchPostsByLocation() {
    yield takeEvery(GET_POSTS_BY_LOCATION, fetchAllPosts)
}

export function* watchFetchSportPosts() {
    yield takeEvery(GET_SPORT_POSTS, fetchSportPosts)
}

export function* watchFetchFamilyPost() {
    yield takeEvery( GET_FAMILY_POSTS, fetchFamilyPosts)
}