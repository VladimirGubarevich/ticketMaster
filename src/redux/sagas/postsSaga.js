import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getPostsByLocal, getSportPosts, getFamilyPosts } from '../../services/API';
import {
    fetchPostsSuccess
    , ErrorFetchData
    , loading
    , getTotalPages
} from '../actions/posts.action';

const getItemsFromState = state => state.search;

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
    } catch {
        yield put(loading(false));
        yield put(ErrorFetchData(true));
    }
}

function* fetchAllPosts(page) {
    const search = yield select(getItemsFromState);
    const queryString = [search.location.country, search.location.city, page.payload];
    yield fetchData(getPostsByLocal, queryString);
}

function* fetchSportPosts(page) {
    const search = yield select(getItemsFromState);
    const queryString = [search.searchSports.keyword, search.searchSports.classification, search.location.country, search.location.city, page.payload];
    yield fetchData(getSportPosts, queryString);
}

function* fetchFamilyPosts(page) {
    const search = yield select(getItemsFromState);
    const queryString = [search.searchFamily.keyword, search.searchFamily.classification, search.location.country, search.location.city, page.payload];
    yield fetchData(getFamilyPosts, queryString);
}

export function* watchFetchData() {
    yield takeEvery('GET_POSTS', fetchAllPosts)
}

export function* watchSportPosts() {
    yield takeEvery('GET_SPORT_POSTS', fetchSportPosts)
}

export function* watchFamilyPost() {
    yield takeEvery('GET_FAMILY_POSTS', fetchFamilyPosts)
}