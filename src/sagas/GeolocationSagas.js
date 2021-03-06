import {call, put, takeLatest} from "redux-saga/effects";
import {
  fetchGeolocation, requestGeolocation, receiveGeolocation, requestGeolocationFailed,
  fetchIpGeolocation, requestIpGeolocation, receiveIpGeolocation, requestIpGeolocationFailed
} from '@actions/GeolocationActions';
import {alert} from '@actions/DashboardApiActions';
import 'isomorphic-fetch';

export function* fetchGeolocationSaga() {
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
    yield put(requestGeolocationFailed(error.message || error.toString()));
  }
}

export function* fetchIpGeolocationSaga() {
  try {
    yield put(requestIpGeolocation());
    const url = 'https://ipapi.co/json/';
    const json = yield call(() => fetch(url).then(res => res.json()));
    yield put(receiveIpGeolocation(json));
  } catch (error) {
    yield (requestIpGeolocationFailed(error.toString()));
  }
}

export default [
  takeLatest(fetchGeolocation, fetchGeolocationSaga),
  takeLatest(fetchIpGeolocation, fetchIpGeolocationSaga)
];
