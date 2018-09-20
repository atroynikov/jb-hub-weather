import {call, put, takeLatest} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    fetchOwmWeather, requestOwmWeather, receiveOwmWeather, requestOwmWeatherFailed,
    fetchOwmForecast, requestOwmForecast, receiveOwmForecast, requestOwmForecastFailed
} from '../actions/OpenWeatherMapActions';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const APP_ID = '757dd97f4bcba5a5328ebb5395a61384';

function* fetchOwmWeatherSaga() {
    const url = `${BASE_URL}/weather?q=Sankt-Peterburg&units=metric&appid=${APP_ID}`;

    try {
        yield put(requestOwmWeather());
        const json = yield call(() => fetch(url).then(res => res.json()));
        yield put(receiveOwmWeather(json));
    } catch (error) {
        yield put(requestOwmWeatherFailed(error.toString()));
    }
}

function* fetchOwmForecastSaga() {
    const url = `${BASE_URL}/forecast?q=Sankt-Peterburg&units=metric&cnt=7&appid=${APP_ID}`;

    try {
        yield put(requestOwmForecast());
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