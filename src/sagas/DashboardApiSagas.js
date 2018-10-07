import {call, put, select, getContext, takeEvery} from 'redux-saga/effects';

import {
  readConfig, readConfigStarted, readConfigFinished, readConfigFailed,
  storeConfig, storeConfigStarted, storeConfigFinished, storeConfigFailed,
  readCache, readCacheStarted, readCacheFinished, readCacheFailed,
  storeCache, storeCacheStarted, storeCacheFinished, storeCacheFailed,
  setTitle, setTitleStarted, setTitleFinished, setTitleFailed,
  setLoadingAnimation, setLoadingAnimationStarted, setLoadingAnimationFinished, setLoadingAnimationFailed,
  alert, alertStarted, alertFinished, alertFailed
} from '@actions/DashboardApiActions';

export function* readConfigSaga() {
  try {
    yield put(readConfigStarted());
    const dashboardApi = yield getContext('dashboardApi');
    const config = yield call([dashboardApi, 'readConfig']);
    yield put(readConfigFinished(config));
  } catch (error) {
    yield put(readConfigFailed(error.toString()));
  }
}

export function* storeConfigSaga({payload}) {
  try {
    yield put(storeConfigStarted(payload));
    const dashboardApi = yield getContext('dashboardApi');
    yield call([dashboardApi, 'storeConfig'], payload);
    yield put(storeConfigFinished(payload));
  } catch (error) {
    yield put(storeConfigFailed(error.toString()));
  }
}

export function* readCacheSaga() {
  try {
    yield put(readCacheStarted());
    const dashboardApi = yield getContext('dashboardApi');
    const cache = yield call([dashboardApi, 'readCache']);
    yield put(readCacheFinished(cache));
  } catch (error) {
    yield put(readCacheFailed(error.toString()));
  }
}

export function* storeCacheSaga({payload}) {
  try {
    yield put(storeCacheStarted(payload));
    const dashboardApi = yield getContext('dashboardApi');
    yield call([dashboardApi, 'storeCache'], payload);
    yield put(storeCacheFinished(payload));
  } catch (error) {
    yield put(storeCacheFailed(error.toString()));
  }
}

export function* setTitleSaga({payload}) {
  try {
    yield put(setTitleStarted());
    const [label, labelUrl] = payload.split("\0");
    const dashboardApi = yield getContext('dashboardApi');
    yield call([dashboardApi, 'setTitle'], label, labelUrl);
    yield put(setTitleFinished(label, labelUrl));
  } catch (error) {
    yield put(setTitleFailed(error.toString()));
  }
}

export function* setLoadingAnimationSaga({payload}) {
  try {
    yield put(setLoadingAnimationStarted());
    const dashboardApi = yield getContext('dashboardApi');
    yield call([dashboardApi, 'setLoadingAnimationEnabled'], payload);
    yield put(setLoadingAnimationFinished());
  } catch (error) {
    yield put(setLoadingAnimationFailed(error.toString()));
  }
}

export function* alertSaga({payload}) {
  try {
    yield put(alertStarted());
    const [message, type, timeout] = payload.split("\0");
    const dashboardApi = yield getContext('dashboardApi');
    yield call([dashboardApi, 'alert'], message, type, timeout ? parseInt(timeout) : []._);
    yield put(alertFinished());
  } catch (error) {
    yield put(alertFailed(error.toString()));
  }
}

export default [
  takeEvery(readConfig, readConfigSaga),
  takeEvery(storeConfig, storeConfigSaga),
  takeEvery(readCache, readCacheSaga),
  takeEvery(storeCache, storeCacheSaga),
  takeEvery(setTitle, setTitleSaga),
  takeEvery(setLoadingAnimation, setLoadingAnimationSaga),
  takeEvery(alert, alertSaga)
];
