import {call, put, take, getContext, takeLatest} from 'redux-saga/effects';

import {
  enterConfigMode, enterConfigModeStarted, enterConfigModeFinished, enterConfigModeFailed,
  exitConfigMode, exitConfigModeStarted, exitConfigModeFinished, exitConfigModeFailed,
  openConfiguration, openConfigurationStarted, openConfigurationFinished, openConfigurationFailed,
  saveConfiguration, saveConfigurationStarted, saveConfigurationFinished, saveConfigurationFailed
} from '@actions/ConfigurationActions';
import {
  storeConfig, storeConfigFinished, setTitle
} from '@actions/DashboardApiActions';
import {
  refreshWidget, refreshWidgetFinished
} from '@actions/WidgetActions';
import {WIDGET_TITLE, WIDGET_TITLE_CONFIG} from '@constants';

export function* enterConfigModeSaga() {
  const dashboardApi = yield getContext('dashboardApi');
  try {
    yield put(enterConfigModeStarted());
    yield call(dashboardApi.enterConfigMode);
    yield put(setTitle(WIDGET_TITLE_CONFIG));
    yield put(enterConfigModeFinished());
  } catch (error) {
    yield put(enterConfigModeFailed(error.toString()));
  }
}

export function* exitConfigModeSaga() {
  const dashboardApi = yield getContext('dashboardApi');
  try {
    yield put(exitConfigModeStarted());
    yield call(dashboardApi.exitConfigMode);
    yield put(setTitle(WIDGET_TITLE));
    yield put(exitConfigModeFinished());
  } catch (error) {
    yield put(exitConfigModeFailed(error.toString()));
  }
}

export function* openConfigurationSaga() {
  try {
    yield put(openConfigurationStarted());
    yield put(enterConfigMode());
    yield take(enterConfigModeFinished.getType());
    yield put(openConfigurationFinished());
  } catch (error) {
    yield put(openConfigurationFailed(error.toString()));
  }
}

export function* saveConfigurationSaga({payload}) {
  try {
    yield put(saveConfigurationStarted());
    yield put(storeConfig(payload));
    yield take(storeConfigFinished.getType());
    yield put(exitConfigMode());
    yield take(exitConfigModeFinished.getType());
    yield put(refreshWidget());
    yield take(refreshWidgetFinished.getType());
    yield put(saveConfigurationFinished());
  } catch (error) {
    yield put(saveConfigurationFailed(error.toString()));
  }
}

export default [
  takeLatest(enterConfigMode, enterConfigModeSaga),
  takeLatest(exitConfigMode, exitConfigModeSaga),
  takeLatest(openConfiguration, openConfigurationSaga),
  takeLatest(saveConfiguration, saveConfigurationSaga)
];
