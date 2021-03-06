import {call, put, select, takeLatest} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  fetchDsWeather, requestDsWeather, receiveDsWeather, requestDsWeatherFailed,
  fetchDsForecast, requestDsForecast, receiveDsForecast, requestDsForecastFailed
} from '@actions/DarkSkyActions';
import {alert} from '@actions/DashboardApiActions';
import {ApiBaseURL} from '@constants';

const BASE_URL = ApiBaseURL.DARK_SKY;

export function* fetchDsWeatherSaga({payload}) {
  try {
    let url;
    const exclude = ['minutely', 'hourly', 'daily', 'alerts', 'flags'].join(',');

    yield put(requestDsWeather());
    const {
      placeName: name, unitsFormat: units, dsSecretKey: key
    } = yield select(state => state.dashboardApi.config.data);
    if (payload.hasOwnProperty('lat') && payload.hasOwnProperty('lon')) {
      const {lat, lon} = payload;
      url = `${BASE_URL}/${key}/${lat},${lon}?exclude=${encodeURIComponent(exclude)}`;
    } else if (payload.hasOwnProperty('name')) {

    }
    const json = yield call(() => fetch(url).then(res => res.json()));
    yield put(receiveDsWeather(json));
  } catch (error) {
    yield put(alert(error.toString(), 'error'));
    yield put(requestDsWeatherFailed(error.toString()));
  }
}

export function* fetchDsForecastSaga({payload}) {
  try {
    let url;
    const exclude = ['currently', 'minutely', 'hourly', 'alerts', 'flags'].join(',');

    yield put(requestDsForecast());
    const {
      placeName: name, forecastDays: days, unitsFormat: units, dsSecretKey: key
    } = yield select(state => state.dashboardApi.config.data);
    const cnt = days * 8;
    if (payload.hasOwnProperty('lat') && payload.hasOwnProperty('lon')) {
      const {lat, lon} = payload;
      url = `${BASE_URL}/${key}/${lat},${lon}?exclude=${encodeURIComponent(exclude)}`;
    } else if (payload.hasOwnProperty('name')) {

    }
    const json = yield call(() => fetch(url).then(res => res.json()));
    yield put(receiveDsForecast(json));
  } catch (error) {
    yield put(alert(error.toString(), 'error'));
    yield put(requestDsForecastFailed(error.toString()));
  }
}

export default [
  takeLatest(fetchDsWeather, fetchDsWeatherSaga),
  takeLatest(fetchDsForecast, fetchDsForecastSaga)
];
