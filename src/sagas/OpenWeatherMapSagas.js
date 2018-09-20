import {call, put, select, takeLatest} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    fetchOwmWeather, requestOwmWeather, receiveOwmWeather, requestOwmWeatherFailed,
    fetchOwmForecast, requestOwmForecast, receiveOwmForecast, requestOwmForecastFailed
} from '../actions/OpenWeatherMapActions';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function* fetchOwmWeatherSaga() {
    try {
        yield put(requestOwmWeather());
        const {owmAppId: appId, tempScale: scale} = yield select(state => state.dashboardApi.config.data);
        const units = {C: 'metric', F: 'imperial', K: ''}[scale];
        const url = `${BASE_URL}/weather?q=Sankt-Peterburg&units=${units}&appid=${appId}`;
        const json = yield call(() => fetch(url).then(res => res.json()));
        yield put(receiveOwmWeather(json));
    } catch (error) {
        yield put(requestOwmWeatherFailed(error.toString()));
    }
}

function* fetchOwmForecastSaga() {
    try {
        yield put(requestOwmForecast());
        const {owmAppId: APP_ID} = yield select(state => state.dashboardApi.config.data);
        const url = `${BASE_URL}/forecast?q=Sankt-Peterburg&units=metric&cnt=7&appid=${APP_ID}`;
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