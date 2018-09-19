import {call, put, select, getContext} from 'redux-saga/effects';

import {
    requestFetchConfiguration, receiveFetchConfiguration, requestFetchConfigurationFailed,
    requestStoreConfiguration, receiveStoreConfiguration, requestStoreConfigurationFailed,
    requestFetchCache, receiveFetchCache, requestFetchCacheFailed,
    requestStoreCache, receiveStoreCache, requestStoreCacheFailed,
    setTitleStarted, setTitleFinished, setTitleFailed,
    setLoadingAnimationStarted, setLoadingAnimationFinished, setLoadingAnimationFailed
} from '../actions/DashboardApiActions';

export function* fetchConfigurationSaga() {
    try {
        yield put(requestFetchConfiguration());
        const dashboardApi = yield getContext('dashboardApi');
        const config = yield call(dashboardApi.readConfig);
        yield put(receiveFetchConfiguration(config));
    } catch (error) {
        yield put(requestFetchConfigurationFailed(error.toString()));
    }
}

export function* storeConfigurationSaga(action) {
    try {
        yield put(requestStoreConfiguration());
        const dashboardApi = yield getContext('dashboardApi');
        yield call(dashboardApi.storeConfig, action.payload);
        yield put(receiveStoreConfiguration());
    } catch (error) {
        yield put(requestStoreConfigurationFailed(error.toString()));
    }
}

export function* fetchCacheSaga() {
    try {
        yield put(requestFetchCache());
        const dashboardApi = yield getContext('dashboardApi');
        const cache = yield call(dashboardApi.readCache);
        yield put(receiveFetchCache(cache));
    } catch (error) {
        yield put(requestFetchCacheFailed(error.toString()));
    }
}

export function* storeCacheSaga(action) {
    try {
        yield put(requestStoreCache());
        const dashboardApi = yield getContext('dashboardApi');
        const {weather, forecast} = yield select();
        yield call(dashboardApi.storeCache, {
            weather: weather,
            forecast: forecast
        });
        yield put(receiveStoreCache());
    } catch (error) {
        yield put(requestStoreCacheFailed(error.toString()));
    }
}

export function* setTitleSaga({payload: payload}) {
    try {
        yield put(setTitleStarted());
        const dashboardApi = yield getContext('dashboardApi');
        const args = payload.split("\0");
        yield call(dashboardApi.setTitle, args[0], args[1]||null);
        yield put(setTitleFinished());
    } catch (error) {
        yield put(setTitleFailed(error.toString()));
    }
}

export function* setLoadingAnimationSaga({payload: payload}) {
    try {
        yield put(setLoadingAnimationStarted());
        const dashboardApi = yield getContext('dashboardApi');
        yield call(dashboardApi.setLoadingAnimationEnabled, payload);
        yield put(setLoadingAnimationFinished());
    } catch (error) {
        yield put(setLoadingAnimationFailed(error.toString()));
    }
}