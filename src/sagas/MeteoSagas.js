import {call, put, take, select, takeLatest} from 'redux-saga/effects';

import {
    fetchWeather, fetchWeatherStarted, fetchWeatherFinished, fetchWeatherFailed,
    fetchForecast, fetchForecastStarted, fetchForecastFinished, fetchForecastFailed,
} from '@actions/MeteoActions';
import {
    fetchOwmWeather, receiveOwmWeather, requestOwmWeatherFailed,
    fetchOwmForecast, receiveOwmForecast, requestOwmForecastFailed
} from '@actions/OpenWeatherMapActions';
import openWeatherMapSagas from './OpenWeatherMapSagas';

function* fetchWeatherSaga() {
    try {
        let ipGeo;
        let data;
        let fetchAct;
        let fetchFinishedAct;

        yield put(fetchWeatherStarted());
        const config = yield select(state => state.dashboardApi.config.data);
        switch (config.locSource) {
            case 'name':
                data = {name: config.placeName};
                break;
            case 'coord':

                break;
            default:
                ipGeo = yield select(state => state.geolocationApi.ip.data);
                data = {lat: ipGeo.lat, lon: ipGeo.lon};
        }
        switch (config.dataSource) {
            default:
                fetchAct = fetchOwmWeather;
                fetchFinishedAct = receiveOwmWeather;
        }

        yield put(fetchAct(data));
        const {payload} = yield take([fetchFinishedAct.getType()]);
        yield put(fetchWeatherFinished(payload));
    } catch (error) {
        yield put(fetchWeatherFailed(error.toString()));
    }
}

function* fetchForecastSaga() {
    try {
        let ipGeo;
        let data;
        let fetchAct;
        let fetchFinishedAct;

        yield put(fetchForecastStarted());
        const config = yield select(state => state.dashboardApi.config.data);
        switch (config.locSource) {
            case 'name':
                data = {name: config.placeName};
                break;
            case 'coord':

                break;
            default:
                ipGeo = yield select(state => state.geolocationApi.ip.data);
                data = {lat: ipGeo.lat, lon: ipGeo.lon};
        }
        switch (config.dataSource) {
            default:
                fetchAct = fetchOwmForecast;
                fetchFinishedAct = receiveOwmForecast;
        }

        yield put(fetchAct(data));
        const {payload} = yield take([fetchFinishedAct.getType()]);
        yield put(fetchForecastFinished(payload));
    } catch (error) {
        yield put(fetchForecastFailed(error.t));
    }
}

export default [
    takeLatest(fetchWeather, fetchWeatherSaga),
    takeLatest(fetchForecast, fetchForecastSaga),
    ...openWeatherMapSagas
];