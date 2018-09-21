import {call, put, select, getContext, takeLatest} from 'redux-saga/effects';

import {
    fetchConfiguration, requestFetchConfiguration, receiveFetchConfiguration, requestFetchConfigurationFailed,
    storeConfiguration, requestStoreConfiguration, receiveStoreConfiguration, requestStoreConfigurationFailed,
    fetchCache, requestFetchCache, receiveFetchCache, requestFetchCacheFailed,
    storeCache, requestStoreCache, receiveStoreCache, requestStoreCacheFailed,
    setTitle, setTitleStarted, setTitleFinished, setTitleFailed,
    setLoadingAnimation, setLoadingAnimationStarted, setLoadingAnimationFinished, setLoadingAnimationFailed,
    alert,alertStarted, alertFinished, alertFailed
} from '@actions/DashboardApiActions';

function* fetchConfigurationSaga() {
    try {
        yield put(requestFetchConfiguration());
        const dashboardApi = yield getContext('dashboardApi');
        const config = yield call(dashboardApi.readConfig);
        yield put(receiveFetchConfiguration(config));
    } catch (error) {
        yield put(requestFetchConfigurationFailed(error.toString()));
    }
}

function* storeConfigurationSaga({payload}) {
    try {
        yield put(requestStoreConfiguration(payload));
        const dashboardApi = yield getContext('dashboardApi');
        yield call(dashboardApi.storeConfig, payload);
        yield put(receiveStoreConfiguration(payload));
    } catch (error) {
        yield put(requestStoreConfigurationFailed(error.toString()));
    }
}

function* fetchCacheSaga() {
    try {
        yield put(requestFetchCache());
        const dashboardApi = yield getContext('dashboardApi');
        const cache = yield call(dashboardApi.readCache);
        yield put(receiveFetchCache(cache));
    } catch (error) {
        yield put(requestFetchCacheFailed(error.toString()));
    }
}

function* storeCacheSaga({payload}) {
    try {
        yield put(requestStoreCache(payload));
        const dashboardApi = yield getContext('dashboardApi');
        const {weather, forecast} = yield select();
        yield call(dashboardApi.storeCache, payload);
        yield put(receiveStoreCache(payload));
    } catch (error) {
        yield put(requestStoreCacheFailed(error.toString()));
    }
}

function* setTitleSaga({payload}) {
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

function* setLoadingAnimationSaga({payload}) {
    try {
        yield put(setLoadingAnimationStarted());
        const dashboardApi = yield getContext('dashboardApi');
        yield call(dashboardApi.setLoadingAnimationEnabled, payload);
        yield put(setLoadingAnimationFinished());
    } catch (error) {
        yield put(setLoadingAnimationFailed(error.toString()));
    }
}

function* alertSaga({payload}) {
    try {
        yield put(alertStarted());
        const dashboardApi = yield getContext('dashboardApi');
        const args = payload.split("\0");
        yield call(dashboardApi.alert, args[0], args[1]||[]._, args[2] ? parseInt(args[2]) : []._);
        yield put(alertFinished());
    } catch (error) {
        yield put(alertFailed(error.toString()));
    }
}

export default [
    takeLatest(fetchConfiguration, fetchConfigurationSaga),
    takeLatest(storeConfiguration, storeConfigurationSaga),
    takeLatest(fetchCache, fetchCacheSaga),
    takeLatest(storeCache, storeCacheSaga),
    takeLatest(setTitle, setTitleSaga),
    takeLatest(setLoadingAnimation, setLoadingAnimationSaga),
    takeLatest(alert, alertSaga)
];