import {call, put, take, select, takeLatest} from 'redux-saga/effects';

import {
  fetchWeather, fetchWeatherStarted, fetchWeatherFinished, fetchWeatherFailed,
  fetchForecast, fetchForecastStarted, fetchForecastFinished, fetchForecastFailed,
} from '@actions/MeteoActions';
import {
  fetchOwmWeather, receiveOwmWeather, requestOwmWeatherFailed,
  fetchOwmForecast, receiveOwmForecast, requestOwmForecastFailed
} from '@actions/OpenWeatherMapActions';
import {
  fetchDsWeather, receiveDsWeather, requestDsWeatherFailed,
  fetchDsForecast, receiveDsForecast, requestDsForecastFailed
} from '@actions/DarkSkyActions';
import openWeatherMapSagas from './OpenWeatherMapSagas';
import darkSkySagas from './DarkSkySagas';
import {getConfig} from '@selectors/DashboardApiSelectors';
import {getIpGeoData} from '@selectors/GeolocationSelectors';

export function* fetchWeatherSaga() {
  try {
    let ipGeo;
    let data;
    let fetchAct;
    let fetchFinishedAct;

    yield put(fetchWeatherStarted());
    const config = yield select(getConfig);
    //ToDo: replace hardcoded types to enum const
    switch (config.locSource) {
      case 'name':
        data = {name: config.placeName};
        break;
      case 'coord':

        break;
      default:
        ipGeo = yield select(getIpGeoData);
        data = {lat: ipGeo.latitude, lon: ipGeo.longitude};
    }
    switch (config.dataSource) {
      case 'ds':
        fetchAct = fetchDsWeather;
        fetchFinishedAct = receiveDsWeather;
        break;
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

export function* fetchForecastSaga() {
  try {
    let ipGeo;
    let data;
    let fetchAct;
    let fetchFinishedAct;

    yield put(fetchForecastStarted());
    const config = yield select(getConfig);
    switch (config.locSource) {
      case 'name':
        data = {name: config.placeName};
        break;
      case 'coord':

        break;
      default:
        ipGeo = yield select(getIpGeoData);
        data = {lat: ipGeo.latitude, lon: ipGeo.longitude};
    }
    switch (config.dataSource) {
      case 'ds':
        fetchAct = fetchDsForecast;
        fetchFinishedAct = receiveDsForecast;
        break;
      default:
        fetchAct = fetchOwmForecast;
        fetchFinishedAct = receiveOwmForecast;
    }

    yield put(fetchAct(data));
    const {payload} = yield take([fetchFinishedAct.getType()]);
    yield put(fetchForecastFinished(payload));
  } catch (error) {
    yield put(fetchForecastFailed(error.toString()));
  }
}

export default [
  takeLatest(fetchWeather, fetchWeatherSaga),
  takeLatest(fetchForecast, fetchForecastSaga),
  ...openWeatherMapSagas,
  ...darkSkySagas
];
