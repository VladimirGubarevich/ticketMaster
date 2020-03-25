import { all, fork } from 'redux-saga/effects';

import { watchFetchPostsByLocation, watchFetchSportPosts, watchFetchFamilyPost } from './postsSaga';

export default function* rootSaga() {
    yield all([
        fork(watchFetchPostsByLocation),
        fork(watchFetchSportPosts),
        fork(watchFetchFamilyPost)
    ]);
}