import {call, put} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    requestWeather, receiveWeather, requestWeatherFailed,
    requestForecast, receiveForecast, requestForecastFailed
} from '../actions/OpenWeatherMapActions';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const APP_ID = '757dd97f4bcba5a5328ebb5395a61384';

export function* fetchWeatherSaga() {
    const url = `${BASE_URL}/weather?q=Sankt-Peterburg&units=metric&appid=${APP_ID}`;

    try {
        yield put(requestWeather());
        const json = yield call(() => fetch(url).then(res => res.json()));
        yield put(receiveWeather(json));
    } catch (error) {
        yield put(requestWeatherFailed(error.toString()));
    }
}

export function* fetchForecastSaga() {
    const url = `${BASE_URL}/forecast?q=Sankt-Peterburg&units=metric&cnt=7&appid=${APP_ID}`;

    try {
        yield put(requestForecast());
        const json = yield call(() => fetch(url).then(res => res.json()));
        yield put(receiveForecast(json));
    } catch (error) {
        yield put(requestForecastFailed(error.toString()));
    }
}