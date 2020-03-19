import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getPostsByLocal } from '../../services/API';
import {
    fetchPostsSuccess
    , ErrorFetchData
    , loading
    , getTotalPages
} from '../actions/posts.action';

const getItemsFromState = state => state.posts;

function* fetchData() {
    try {
        yield put(ErrorFetchData(false));
        yield put(loading(true));
        const country = yield select(getItemsFromState);
        const res = yield call(getPostsByLocal, country.searchBy);
        yield put(fetchPostsSuccess(res._embedded.events));
        yield put(getTotalPages(res.page.totalPages))
    } catch {
        yield put(loading(false));
        yield put(ErrorFetchData(true));
    }
}

export function* watchFetchData() {
    yield takeEvery('GET_POSTS', fetchData)
}