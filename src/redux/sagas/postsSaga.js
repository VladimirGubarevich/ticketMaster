import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getPostsByLocal, getSportPosts } from '../../services/API';
import {
    fetchPostsSuccess
    , ErrorFetchData
    , loading
    , getTotalPages
} from '../actions/posts.action';

const getItemsFromState = state => state.search.search;

function* fetchData(page) {
    try {
        yield put(ErrorFetchData(false));
        yield put(loading(true));
        const search = yield select(getItemsFromState);
        const res = yield call(getPostsByLocal, search.country, search.city, page.payload);
        yield put(fetchPostsSuccess(res._embedded.events));
        yield put(getTotalPages(res.page.totalPages))
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
        const queryString = [search.keyword, search.classification, search.country, search.city, page.payload];
        let result = yield call(getSportPosts, ...queryString);
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