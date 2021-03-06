import {call, put, select, takeLatest} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  fetchOwmWeather, requestOwmWeather, receiveOwmWeather, requestOwmWeatherFailed,
  fetchOwmForecast, requestOwmForecast, receiveOwmForecast, requestOwmForecastFailed
} from '@actions/OpenWeatherMapActions';
import {getConfig} from '@selectors/DashboardApiSelectors';
import {ApiBaseURL} from '@constants';

const BASE_URL = ApiBaseURL.OPEN_WEATHER_MAP;

export function* fetchOwmWeatherSaga({payload}) {
  try {
    let url;

    yield put(requestOwmWeather());
    const {
      placeName: name, unitsFormat: units, owmAppId: appId
    } = yield select(getConfig);
    if (payload.hasOwnProperty('lat') && payload.hasOwnProperty('lon')) {
      url = `${BASE_URL}/weather?lat=${encodeURIComponent(payload.lat)}&lon=${encodeURIComponent(payload.lon)}&units=${units}&appid=${appId}`;
    } else if (payload.hasOwnProperty('name')) {
      url = `${BASE_URL}/weather?q=${encodeURIComponent(name)}&units=${units}&appid=${appId}`;
    }
    const json = yield call(() => fetch(url).then(res => res.json()));
    yield put(receiveOwmWeather(json));
  } catch (error) {
    yield put(requestOwmWeatherFailed(error.toString()));
  }
}

export function* fetchOwmForecastSaga({payload}) {
  try {
    let url;

    yield put(requestOwmForecast());
    const {
      placeName: name, forecastDays: days, unitsFormat: units, owmAppId: appId
    } = yield select(getConfig);
    const cnt = days * 8;
    if (payload.hasOwnProperty('lat') && payload.hasOwnProperty('lon')) {
      const {lat, lon} = payload;
      url = `${BASE_URL}/forecast?lat=${encodeURIComponent(lat)}`
        + `&lon=${encodeURIComponent(lon)}&units=${units}&cnt=${cnt}&appid=${appId}`;
    } else if (payload.hasOwnProperty('name')) {
      url = `${BASE_URL}/forecast?q=${encodeURIComponent(name)}&units=${units}&cnt=${cnt}&appid=${appId}`;
    }
    const json = yield call(() => fetch(url).then(res => res.json()));
    yield put(receiveOwmForecast(json));
  } catch (error) {
    yield put(requestOwmForecastFailed(error.toString()));
  }
}

export default [
  takeLatest(fetchOwmWeather, fetchOwmWeatherSaga),
  takeLatest(fetchOwmForecast, fetchOwmForecastSaga)
];
