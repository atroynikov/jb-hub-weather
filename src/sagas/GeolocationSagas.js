import {call, put, takeLatest} from "redux-saga/effects";
import {
    fetchGeolocation, requestGeolocation, receiveGeolocation, requestGeolocationFailed,
    fetchIpGeolocation, requestIpGeolocation, receiveIpGeolocation, requestIpGeolocationFailed
} from '@actions/GeolocationActions';
import {alert} from '@actions/DashboardApiActions'
import fetch from "isomorphic-fetch";

function* fetchGeolocationSaga() {
    // Need allow="geolocation" in Hub iframe
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
        yield put(alert(error.toString(), 'error'));
        yield put(requestGeolocationFailed(error.message||error.toString()));
    }
}

function* fetchIpGeolocationSaga() {
    try {
        yield put(requestIpGeolocation());
        const url = `http://ip-api.com/json`;
        const json = yield call(() => fetch(url).then(res => res.json()));
        yield put(receiveIpGeolocation(json));
    } catch (error) {
        yield put(alert(error.toString(), 'error'));
        yield (requestIpGeolocationFailed(error.toString()));
    }
}

export default [
    takeLatest(fetchGeolocation, fetchGeolocationSaga),
    takeLatest(fetchIpGeolocation, fetchIpGeolocationSaga)
];