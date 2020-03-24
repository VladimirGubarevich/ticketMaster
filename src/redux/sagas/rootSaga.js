import { all, fork } from 'redux-saga/effects';

import { watchFetchData, watchSportPosts, watchFamilyPost } from './postsSaga';

export default function* rootSaga() {
    yield all([
        fork(watchFetchData),
        fork(watchSportPosts),
        fork(watchFamilyPost)
    ]);
}