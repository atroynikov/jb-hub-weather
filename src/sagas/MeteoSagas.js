import {call, put, take, select, takeLatest} from 'redux-saga/effects';

import {
    fetchWeather, fetchWeatherStarted, fetchWeatherFinished, fetchWeatherFailed,
    fetchForecast, fetchForecastStarted, fetchForecastFinished, fetchForecastFailed,
} from '../actions/MeteoActions';
import {
    fetchOwmWeather, receiveOwmWeather, requestOwmWeatherFailed,
    fetchOwmForecast, receiveOwmForecast, requestOwmForecastFailed
} from '../actions/OpenWeatherMapActions';
import openWeatherMapSagas from './OpenWeatherMapSagas';

function* fetchWeatherSaga() {
    try {
        yield put(fetchWeatherStarted());
        const config = yield select(state => state.dashboardApi.config.data);
        let fetchWeatherAct;
        let fetchWeatherFinishedAct;
        switch (config.dataSource) {
            default:
                fetchWeatherAct = fetchOwmWeather;
                fetchWeatherFinishedAct = receiveOwmWeather;
        }
        yield put(fetchWeatherAct());
        const {payload} = yield take([fetchWeatherFinishedAct.getType()]);
        yield put(fetchWeatherFinished(payload));
    } catch (error) {
        yield put(fetchWeatherFailed(error.toString()));
    }
}

function* fetchForecastSaga() {
    try {
        yield put(fetchForecastStarted());

        yield put(fetchForecastFinished());
    } catch (error) {
        yield put(fetchForecastFailed(error.t));
    }
}

export default [
    takeLatest(fetchWeather, fetchWeatherSaga),
    takeLatest(fetchForecast, fetchForecastSaga),
    ...openWeatherMapSagas
];