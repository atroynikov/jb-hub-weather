import {call, put} from "redux-saga/effects";
import {
    requestGeolocation,
    receiveGeolocation,
    requestGeolocationFailed
} from '../actions/GeolocationActions';

export function* fetchGeolocationSaga() {
    if (!navigator.geolocation) {
        yield put(requestGeolocationFailed(null));
    }

    try {
        yield put(requestGeolocation());
        const response = yield call(() => new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error)
            )
        }));
        yield put(receiveGeolocation(response));
    } catch (error) {
        yield put(requestGeolocationFailed(error.message||error.toString()));
    }
}