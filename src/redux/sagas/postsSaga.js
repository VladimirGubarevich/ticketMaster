import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getSearchReducer } from '../selectors/searchSelectors';
import { paginationSelector } from '../selectors/postsSelectors';
import { GET_POSTS_BY_LOCATION, GET_SPORT_POSTS, GET_FAMILY_POSTS } from '../types';
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
    } catch (e) {
        yield put(loading(false));
        console.error(e);
        yield put(ErrorFetchData(true));
    }
}

// function* fetchAllPosts(numberPage) {
//     const search = yield select(getSearchReducer);
//     const { country, city } = search.location;
//     const queryString = [country, city, numberPage.payload];
//     yield fetchData(getPostsByLocal, queryString);
// }

// function* fetchSportPosts(numberPage) {
//     const search = yield select(getSearchReducer);
//     const { keyword, classification } = search.searchInCategorySports;
//     const { country, city } = search.location;
//     const queryString = [keyword, classification, country, city, numberPage.payload];
//     yield fetchData(getSportPosts, queryString);
// }

// function* fetchFamilyPosts(numberPage) {
//     const search = yield select(getSearchReducer);
//     const { keyword, classification } = search.searchInCategoryFamily;
//     const { country, city } = search.location;
//     const queryString = [keyword, classification, country, city, numberPage.payload];
//     yield fetchData(getFamilyPosts, queryString);
// }

function* fetchAllPosts() {
    const search = yield select(getSearchReducer);
    const pagination = yield select(paginationSelector);
    const { currentPage, size } = pagination;
    const { country, city } = search.location;
    const queryString = [country, city, currentPage, size];
    yield fetchData(getPostsByLocal, queryString);
}

function* fetchSportPosts() {
    const search = yield select(getSearchReducer);
    const pagination = yield select(paginationSelector);
    const { currentPage, size } = pagination;
    const { keyword, classification } = search.searchInCategorySports;
    const { country, city } = search.location;
    const queryString = [keyword, classification, country, city, currentPage, size];
    yield fetchData(getSportPosts, queryString);
}

function* fetchFamilyPosts() {
    const search = yield select(getSearchReducer);
    const pagination = yield select(paginationSelector);
    const { currentPage, size } = pagination;
    const { keyword, classification } = search.searchInCategoryFamily;
    const { country, city } = search.location;
    const queryString = [keyword, classification, country, city, currentPage, size];
    yield fetchData(getFamilyPosts, queryString);
}

export function* watchFetchPostsByLocation() {
    yield takeLatest(GET_POSTS_BY_LOCATION, fetchAllPosts)
}

export function* watchFetchSportPosts() {
    yield takeLatest(GET_SPORT_POSTS, fetchSportPosts)
}

export function* watchFetchFamilyPost() {
    yield takeLatest(GET_FAMILY_POSTS, fetchFamilyPosts)
}