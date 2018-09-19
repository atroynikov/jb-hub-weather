import {call, put} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    receiveTeleport, requestTeleport, requestTeleportFailed
} from '../actions/TeleportActions';

const BASE_URL = 'https://api.teleport.org/api/';

export function* fetchTeleportSaga(params) {
    const url = `${BASE_URL}/cities/?Sankt-Peterburg`;

    try {
        yield put(requestTeleport());
        const response = yield call(fetch, url);
        yield put(receiveTeleport(response.json()));
    } catch (error) {
        yield put(requestTeleportFailed(error.toString()));
    }
}