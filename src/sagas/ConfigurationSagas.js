import {call, put, take, getContext, takeLatest} from 'redux-saga/effects';

import {
    enterConfigMode, enterConfigModeStarted, enterConfigModeFinished, enterConfigModeFailed,
    exitConfigMode, exitConfigModeStarted, exitConfigModeFinished, exitConfigModeFailed,
    openConfigurationStarted, openConfigurationFinished, openConfigurationFailed,
    saveConfigurationStarted, saveConfigurationFinished, saveConfigurationFailed, openConfiguration, saveConfiguration
} from '../actions/ConfigurationActions';
import {
    storeConfiguration, receiveStoreConfiguration, setTitle
} from '../actions/DashboardApiActions';
import {
    refreshWidget, refreshWidgetFinished
} from '../actions/WidgetActions';

function* enterConfigModeSaga() {
    const dashboardApi = yield getContext('dashboardApi');
    try {
        yield put(enterConfigModeStarted());
        yield call(dashboardApi.enterConfigMode);
        yield put(setTitle('Jetbrains Hub weather configuration'));
        yield put(enterConfigModeFinished());
    } catch (error) {
        yield put(enterConfigModeFailed(error.toString()));
    }
}

function* exitConfigModeSaga() {
    const dashboardApi = yield getContext('dashboardApi');
    try {
        yield put(exitConfigModeStarted());
        yield call(dashboardApi.exitConfigMode);
        yield put(setTitle('Jetbrains Hub weather'));
        yield put(exitConfigModeFinished());
    } catch (error) {
        yield put(exitConfigModeFailed(error.toString()));
    }
}

function* openConfigurationSaga() {
    try {
        yield put(openConfigurationStarted());
        yield put(enterConfigMode());
        yield take(enterConfigModeFinished.getType());
        yield put(openConfigurationFinished());
    } catch (error) {
        yield put(openConfigurationFailed(error.toString()));
    }
}

function* saveConfigurationSaga({payload}) {
    try {
        yield put(saveConfigurationStarted());
        yield put(storeConfiguration(payload));
        yield take(receiveStoreConfiguration.getType());
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