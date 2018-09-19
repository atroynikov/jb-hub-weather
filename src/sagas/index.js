import {all, takeLatest, setContext} from 'redux-saga/effects'

import {
    fetchConfiguration, storeConfiguration,
    fetchCache, storeCache,
    setTitle, setLoadingAnimation, alert
} from '../actions/DashboardApiActions';
import {
    enterConfigMode, exitConfigMode, saveConfiguration
} from '../actions/ConfigurationActions';
import {bootstrapWidget, refreshWidget} from '../actions/WidgetActions';
import {fetchGeolocation} from '../actions/GeolocationActions';
import {fetchWeather, fetchForecast} from '../actions/OpenWeatherMapActions';
import {fetchTeleport} from '../actions/TeleportActions';

import {
    fetchConfigurationSaga, storeConfigurationSaga,
    fetchCacheSaga, storeCacheSaga,
    setTitleSaga, setLoadingAnimationSaga, alertSaga
} from './DashboardApiSagas';
import {
    enterConfigModeSaga, exitConfigModeSaga, saveConfigurationSaga
} from './ConfigurationSagas';
import {bootstrapWidgetSaga, refreshWidgetSaga} from './WidgetSagas';
import {fetchGeolocationSaga} from './GeolocationSagas';
import {fetchWeatherSaga, fetchForecastSaga} from './OpenWeatherMapSagas';
import {fetchTeleportSaga} from './TeleportSagas';

const rootSaga = function* (dispatch, dashboardApi, registerWidgetApi) {
    //ToDo: split to several saga watchers
    yield setContext({
        dispatch: dispatch,
        dashboardApi: dashboardApi,
        registerWidgetApi: registerWidgetApi
    });
    yield all([
        takeLatest(bootstrapWidget, bootstrapWidgetSaga),
        takeLatest(refreshWidget, refreshWidgetSaga),

        takeLatest(fetchConfiguration, fetchConfigurationSaga),
        takeLatest(storeConfiguration, storeConfigurationSaga),
        takeLatest(fetchCache, fetchCacheSaga),
        takeLatest(storeCache, storeCacheSaga),
        takeLatest(setTitle, setTitleSaga),
        takeLatest(setLoadingAnimation, setLoadingAnimationSaga),
        takeLatest(alert, alertSaga),

        takeLatest(enterConfigMode, enterConfigModeSaga),
        takeLatest(exitConfigMode, exitConfigModeSaga),
        takeLatest(saveConfiguration, saveConfigurationSaga),

        takeLatest(fetchGeolocation, fetchGeolocationSaga),
        takeLatest(fetchWeather, fetchWeatherSaga),
        takeLatest(fetchForecast, fetchForecastSaga),
        takeLatest(fetchTeleport, fetchTeleportSaga)
    ]);
};

export default rootSaga;