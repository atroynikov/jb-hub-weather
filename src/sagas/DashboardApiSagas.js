import {call, put, select, getContext} from 'redux-saga/effects';

import {
    requestFetchConfiguration, receiveFetchConfiguration, requestFetchConfigurationFailed,
    requestStoreConfiguration, receiveStoreConfiguration, requestStoreConfigurationFailed,
    requestFetchCache, receiveFetchCache, requestFetchCacheFailed,
    requestStoreCache, receiveStoreCache, requestStoreCacheFailed
} from '../actions/DashboardApiActions';

export function* fetchConfigurationSaga() {
    const dashboardApi = yield getContext('dashboardApi');
    try {
        yield put(requestFetchConfiguration());
        const config = yield call(dashboardApi.readConfig);
        yield put(receiveFetchConfiguration(config));
    } catch (error) {
        yield put(requestFetchConfigurationFailed(error.toString()));
    }
}

export function* storeConfigurationSaga(action) {
    const dashboardApi = yield getContext('dashboardApi');
    try {
        yield put(requestStoreConfiguration());
        yield call(dashboardApi.storeConfig, action.payload);
        yield put(receiveStoreConfiguration());
    } catch (error) {
        yield put(requestStoreConfigurationFailed(error.toString()));
    }
}

export function* fetchCacheSaga() {
    const dashboardApi = yield getContext('dashboardApi');
    try {
        yield put(requestFetchCache());
        const cache = yield call(dashboardApi.readCache);
        yield put(receiveFetchCache(cache));
    } catch (error) {
        yield put(requestFetchCacheFailed(error.toString()));
    }
}

export function* storeCacheSaga(cache) {
    try {
        const {weather, forecast} = yield select();
        yield put(requestStoreCache());
        yield call(dashboardApi.storeCache, {
            weather: weather,
            forecast: forecast
        });
        yield put(receiveStoreCache());
    } catch (error) {
        yield put(requestStoreCacheFailed(error.toString()));
    }
}