import {call, put, take, getContext} from 'redux-saga/effects';

import {
    enterConfigModeStarted, enterConfigModeFinished, enterConfigModeFailed,
    exitConfigMode, exitConfigModeStarted, exitConfigModeFinished, exitConfigModeFailed,
    saveConfigurationStarted, saveConfigurationFinished, saveConfigurationFailed
} from '../actions/ConfigurationActions';
import {
    storeConfiguration, receiveStoreConfiguration
} from "../actions/DashboardApiActions";

export function* enterConfigModeSaga() {
    const dashboardApi = yield getContext('dashboardApi');
    try {
        yield put(enterConfigModeStarted());
        yield call(dashboardApi.enterConfigMode);
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
        yield put(exitConfigModeFinished());
    } catch (error) {
        yield put(exitConfigModeFailed(error.toString()));
    }
}

export function* saveConfigurationSaga(action) {
    try {
        yield put(saveConfigurationStarted());
        yield put(storeConfiguration(action.payload));
        yield take(receiveStoreConfiguration.getType());
        yield put(exitConfigMode());
        yield take(exitConfigModeFinished.getType());
        yield put(saveConfigurationFinished());
    } catch (error) {
        yield put(saveConfigurationFailed(error.toString()));
    }
}