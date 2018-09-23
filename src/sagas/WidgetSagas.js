import {call, put, take, all, select, getContext, takeLatest} from 'redux-saga/effects';

import {openConfiguration} from '@actions/ConfigurationActions';
import {fetchGeolocation} from '@actions/GeolocationActions';
import {
    fetchConfiguration, receiveFetchConfiguration, requestStoreCacheFailed,
    fetchCache, receiveFetchCache, requestFetchCacheFailed,
    setLoadingAnimation, setLoadingAnimationFinished,
    alert, alertFinished
} from '@actions/DashboardApiActions';
import {
    fetchWeather, fetchWeatherFinished, fetchWeatherFailed,
    fetchForecast, fetchForecastFinished, fetchForecastFailed
} from '@actions/MeteoActions';
import {
    bootstrapWidget, bootstrapWidgetStarted, bootstrapWidgetFinished, bootstrapWidgetFailed,
    refreshWidget, refreshWidgetStarted, refreshWidgetFinished, refreshWidgetFailed,
} from '@actions/WidgetActions';
import {
    fetchIpGeolocation, receiveIpGeolocation, requestIpGeolocationFailed
} from '@actions/GeolocationActions';

export function* bootstrapWidgetSaga() {
    try {
        yield put(bootstrapWidgetStarted());
        const dispatch = yield getContext('dispatch');
        const registerWidgetApi = yield getContext('registerWidgetApi');
        registerWidgetApi({
            onConfigure: () => dispatch(openConfiguration()),
            onRefresh: () => dispatch(refreshWidget())
        });

        yield all([
            put(fetchConfiguration()),
            put(fetchCache())
        ]);
        const [{type: confActType}, {type: cacheActType}] = yield all([
            take(receiveFetchConfiguration.getType(), requestFetchCacheFailed.getType()),
            take(receiveFetchCache.getType(), requestFetchCacheFailed.getType())
        ]);
        const {
            config: {data: config},
            cache: {data: cache}
        } = yield select(state => state.dashboardApi);

        if (!config) {
            yield put(openConfiguration());
        } else {
            yield put(fetchIpGeolocation());
            yield take([receiveIpGeolocation.getType(), requestIpGeolocationFailed.getType()]);

            let fetchEffects = [put(fetchWeather())];
            let takeEffects = [take([fetchWeatherFinished.getType(), fetchForecastFinished.getType()])];
            if (config.showForecast) {
                fetchEffects.push(put(fetchForecast()));
                takeEffects.push(take([fetchForecastFinished.getType(), fetchForecastFailed.getType()]))
            }
            yield all(fetchEffects);
            const [weatherActType, forecastActType] = yield all(takeEffects);
        }

        yield put(bootstrapWidgetFinished());
    } catch(error) {
        yield put(bootstrapWidgetFailed(error.toString()));
    }
}

export function* refreshWidgetSaga() {
    try {
        yield put(refreshWidgetStarted());
        yield put(setLoadingAnimation(true));
        yield take(setLoadingAnimationFinished.getType());
        yield put(fetchIpGeolocation());
        yield take([receiveIpGeolocation.getType(), requestIpGeolocationFailed.getType()]);

        const {config: {data: config}} = yield select(state => state.dashboardApi);
        let fetchEffects = [put(fetchWeather())];
        let takeEffects = [take([fetchWeatherFinished.getType(), fetchForecastFinished.getType()])];
        if (config.showForecast) {
            fetchEffects.push(put(fetchForecast()));
            takeEffects.push(take([fetchForecastFinished.getType(), fetchForecastFailed.getType()]))
        }
        yield all(fetchEffects);
        const [weatherActType, forecastActType] = yield all(takeEffects);

        yield put(setLoadingAnimation(false));
        yield take(setLoadingAnimationFinished.getType());
        yield put(refreshWidgetFinished());
    } catch(error) {
        yield put(refreshWidgetFailed(error.toString()));
    }
}

export function* initUpdateTimer() {

}

export default [
    takeLatest(bootstrapWidget, bootstrapWidgetSaga),
    takeLatest(refreshWidget, refreshWidgetSaga)
];