import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getPostsByLocal, getSportPosts, getFamilyPosts } from '../../services/API';
import {
    fetchPostsSuccess
    , ErrorFetchData
    , loading
    , getTotalPages
} from '../actions/posts.action';

const getItemsFromState = state => state.search;

function* fetchData(page) {
    try {
        yield put(ErrorFetchData(false));
        yield put(loading(true));
        const search = yield select(getItemsFromState);
        const res = yield call(getPostsByLocal, search.location.country, search.location.city, page.payload);
        yield put(fetchPostsSuccess(res._embedded.events));
        yield put(getTotalPages(res.page.totalPages));
        yield put(loading(false));
    } catch {
        yield put(loading(false));
        yield put(ErrorFetchData(true));
    }
}

function* fetchSportPosts(page) {
    try {
        yield put(ErrorFetchData(false));
        yield put(loading(true));
        const search = yield select(getItemsFromState);
        const queryString = [search.searchSports.keyword, search.searchSports.classification, search.location.country, search.location.city, page.payload];
        let result = yield call(getSportPosts, ...queryString);
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

function* fetchFamilyPosts(page) {
    try {
        yield put(ErrorFetchData(false));
        yield put(loading(true));
        const search = yield select(getItemsFromState);
        const queryString = [search.searchFamily.keyword, search.searchFamily.classification, search.location.country, search.location.city, page.payload];
        let result = yield call(getFamilyPosts, ...queryString);
        if (!result._embedded) {
            yield put(fetchPostsSuccess([]));
        } else {
            yield put(fetchPostsSuccess(result._embedded.events));
        }
        yield put(getTotalPages(result.page.totalPages))
    } catch {
        yield put(loading(false));
        yield put(ErrorFetchData(true));
    }
}

export function* watchFetchData() {
    yield takeEvery('GET_POSTS', fetchData)
}

export function* watchSportPosts() {
    yield takeEvery('GET_SPORT_POSTS', fetchSportPosts)
}

export function* watchFamilyPost() {
    yield takeEvery('GET_FAMILY_POSTS', fetchFamilyPosts)
}