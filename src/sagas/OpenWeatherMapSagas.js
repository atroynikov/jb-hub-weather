import {call, put, select, takeLatest} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    fetchOwmWeather, requestOwmWeather, receiveOwmWeather, requestOwmWeatherFailed,
    fetchOwmForecast, requestOwmForecast, receiveOwmForecast, requestOwmForecastFailed
} from '@actions/OpenWeatherMapActions';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function* fetchOwmWeatherSaga({payload}) {
    try {
        yield put(requestOwmWeather());
        const {
            placeName: name, tempScale: scale, owmAppId: appId
        } = yield select(state => state.dashboardApi.config.data);
        const units = {C: 'metric', F: 'imperial', K: ''}[scale];
        let url;
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

function* fetchOwmForecastSaga({payload}) {
    try {
        yield put(requestOwmForecast());
        const {
            placeName: name, forecastDays: cnt, tempScale: scale, owmAppId: APP_ID
        } = yield select(state => state.dashboardApi.config.data);
        const units = {C: 'metric', F: 'imperial', K: ''}[scale];
        const url = `${BASE_URL}/forecast?q=${encodeURIComponent(name)}&units=${units}&cnt=${cnt}&appid=${APP_ID}`;
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