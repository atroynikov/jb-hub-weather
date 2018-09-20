import {call, put, take, getContext} from 'redux-saga/effects';

import {
    enterConfigMode, enterConfigModeStarted, enterConfigModeFinished, enterConfigModeFailed,
    exitConfigMode, exitConfigModeStarted, exitConfigModeFinished, exitConfigModeFailed,
    openConfigurationStarted, openConfigurationFinished, openConfigurationFailed,
    saveConfigurationStarted, saveConfigurationFinished, saveConfigurationFailed
} from '../actions/ConfigurationActions';
import {
    storeConfiguration, receiveStoreConfiguration, setTitle
} from '../actions/DashboardApiActions';
import {refreshWidget} from '../actions/WidgetActions';

export function* enterConfigModeSaga() {
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

export function* exitConfigModeSaga() {
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

export function* openConfigurationSaga() {
    try {
        yield put(openConfigurationStarted());
        yield put(enterConfigMode());
        yield take(enterConfigModeFinished.getType());
        yield put(openConfigurationFinished());
    } catch (error) {
        yield put(openConfigurationFailedcomponentDidMount(error.toString()));
    }
}

export function* saveConfigurationSaga({payload}) {
    try {
        yield put(saveConfigurationStarted());
        yield put(storeConfiguration(payload));
        yield take(receiveStoreConfiguration.getType());
        yield put(exitConfigMode());
        yield take(exitConfigModeFinished.getType());
        yield put(refreshWidget());
        yield put(saveConfigurationFinished());
    } catch (error) {
        yield put(saveConfigurationFailed(error.toString()));
    }
}