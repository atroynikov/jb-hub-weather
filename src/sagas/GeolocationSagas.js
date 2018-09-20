import {call, put, takeLatest} from "redux-saga/effects";
import {
    fetchGeolocation, requestGeolocation, receiveGeolocation, requestGeolocationFailed
} from '../actions/GeolocationActions';

function* fetchGeolocationSaga() {
    try {
        yield put(requestGeolocation());
        const response = yield call(() => new Promise((resolve, reject) => {
            window.navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error)
            )
        }));
        yield put(receiveGeolocation(response));
    } catch (error) {
        yield put(requestGeolocationFailed(error.message||error.toString()));
    }
}

export default [
    takeLatest(fetchGeolocation, fetchGeolocationSaga),
];