import {call, put, takeLatest} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    fetchTeleport, receiveTeleport, requestTeleport, requestTeleportFailed
} from '@actions/TeleportActions';

const BASE_URL = 'https://api.teleport.org/api/';

function* fetchTeleportSaga({payload}) {
    const url = `${BASE_URL}/cities/?Sankt-Peterburg`;

    try {
        yield put(requestTeleport());
        const response = yield call(fetch, url);
        yield put(receiveTeleport(response.json()));
    } catch (error) {
        yield put(requestTeleportFailed(error.toString()));
    }
}

export default [
    takeLatest(fetchTeleport, fetchTeleportSaga)
];