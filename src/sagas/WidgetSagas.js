import {call, put, take, all, select, getContext, takeLatest} from 'redux-saga/effects';

import {openConfiguration} from '../actions/ConfigurationActions';
//import {fetchGeolocation} from '../actions/GeolocationActions';
import {
    fetchConfiguration, receiveFetchConfiguration, requestStoreCacheFailed,
    fetchCache, receiveFetchCache, requestFetchCacheFailed,
    setLoadingAnimation, setLoadingAnimationFinished,
    alert, alertFinished
} from '../actions/DashboardApiActions';
import {
    fetchWeather, fetchWeatherFinished,
    fetchForecast, fetchForecastFinished
} from '../actions/MeteoActions';
import {
    bootstrapWidget, bootstrapWidgetStarted, bootstrapWidgetFinished, bootstrapWidgetFailed,
    refreshWidget, refreshWidgetStarted, refreshWidgetFinished, refreshWidgetFailed,
} from '../actions/WidgetActions';

function* bootstrapWidgetSaga() {
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

        //yield put(initConfiguration(config));*/
        if (!config) {
            yield put(openConfiguration());
        } else {
            yield all([
                put(fetchWeather())
                //put(fetchForecast())
            ]);
            const [weatherActType, forecastActType] = yield all([
                take([fetchWeatherFinished.getType(), fetchForecastFinished.getType()])
                //take([receiveForecast.getType(), requestForecastFailed.getType()])
            ]);
        }

        yield put(bootstrapWidgetFinished());
    } catch(error) {
        yield put(bootstrapWidgetFailed());
    }
}

function* refreshWidgetSaga() {
    try {
        yield put(refreshWidgetStarted());
        yield put(setLoadingAnimation(true));
        yield take(setLoadingAnimationFinished.getType());
        yield all([
            put(fetchWeather()),
            //put(fetchForecast())
        ]);
        const [weatherActType, forecastActType] = yield all([
            take([fetchWeatherFinished.getType(), fetchForecastFinished.getType()])
            //take([receiveForecast.getType(), requestForecastFailed.getType()])
        ]);
        yield put(setLoadingAnimation(false));
        yield take(setLoadingAnimationFinished.getType());
        yield put(refreshWidgetFinished());
    } catch(error) {
        yield put(refreshWidgetFailed());
    }

}

export default [
    takeLatest(bootstrapWidget, bootstrapWidgetSaga),
    takeLatest(refreshWidget, refreshWidgetSaga)
];