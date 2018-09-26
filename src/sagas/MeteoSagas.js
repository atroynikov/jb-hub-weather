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
import {storeCache} from '@actions/DashboardApiActions';
import openWeatherMapSagas from './OpenWeatherMapSagas';
import darkSkySagas from './DarkSkySagas';
import {getCache, getConfig} from '@selectors/DashboardApiSelectors';
import {getIpGeoData} from '@selectors/GeolocationSelectors';
import {LocationSources, DataSources} from '@constants';

export function* fetchWeatherSaga() {
  try {
    let ipGeo;
    let data;
    let fetchAct;
    let fetchFinishedAct;

    yield put(fetchWeatherStarted());
    const config = yield select(getConfig);
    const cache = yield select(getCache);

    switch (config.locSource) {
      case LocationSources.NAME:
        data = {name: config.placeName};
        break;
      case LocationSources.COORD:

        break;
      default:
        ipGeo = yield select(getIpGeoData);
        data = {lat: ipGeo.latitude, lon: ipGeo.longitude};
    }
    switch (config.dataSource) {
      case DataSources.DARK_SKY:
        fetchAct = fetchDsWeather;
        fetchFinishedAct = receiveDsWeather;
        break;
      default:
        fetchAct = fetchOwmWeather;
        fetchFinishedAct = receiveOwmWeather;
    }

    yield put(fetchAct(data));
    const {payload} = yield take([fetchFinishedAct.getType()]);
    yield put(storeCache({
      ...cache,
      weather: payload
    }));

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
    const cache = yield select(getCache);

    switch (config.locSource) {
      case LocationSources.NAME:
        data = {name: config.placeName};
        break;
      case LocationSources.COORD:

        break;
      default:
        ipGeo = yield select(getIpGeoData);
        data = {lat: ipGeo.latitude, lon: ipGeo.longitude};
    }
    switch (config.dataSource) {
      case DataSources.DARK_SKY:
        fetchAct = fetchDsForecast;
        fetchFinishedAct = receiveDsForecast;
        break;
      default:
        fetchAct = fetchOwmForecast;
        fetchFinishedAct = receiveOwmForecast;
    }

    yield put(fetchAct(data));
    const {payload} = yield take([fetchFinishedAct.getType()]);
    yield put(storeCache({
      ...cache,
      forecast: payload
    }));

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
