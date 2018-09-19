import {call, put, take, all, select, getContext} from 'redux-saga/effects';

import {
    initConfiguration, enterConfigMode
} from '../actions/ConfigurationActions';
import {fetchGeolocation} from '../actions/GeolocationActions';
import {
    fetchConfiguration, receiveFetchConfiguration, requestStoreCacheFailed,
    fetchCache, receiveFetchCache, requestFetchCacheFailed,
    setLoadingAnimation, setLoadingAnimationFinished
} from '../actions/DashboardApiActions';
import {
    fetchWeather, receiveWeather, requestWeatherFailed,
    fetchForecast, receiveForecast, requestForecastFailed
} from '../actions/OpenWeatherMapActions';
import {
    bootstrapWidget, bootstrapWidgetStarted, bootstrapWidgetFinished, bootstrapWidgetFailed,
    refreshWidget, refreshWidgetStarted, refreshWidgetFinished, refreshWidgetFailed
} from '../actions/WidgetActions';

export function* bootstrapWidgetSaga() {
    try {
        yield put(bootstrapWidgetStarted());
        const dispatch = yield getContext('dispatch');
        const registerWidgetApi = yield getContext('registerWidgetApi');
        registerWidgetApi({
            onConfigure: () => dispatch(enterConfigMode()),
            onRefresh: () => dispatch(refreshWidget())
        });
        //yield put(setLoadingAnimation(true));
        //yield take(setLoadingAnimationFinished.getType());
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
            yield put(enterConfigMode());
        } else {
            yield all([
                put(fetchWeather())
                //put(fetchForecast())
            ]);
            const [weatherActType, forecastActType] = yield all([
                take([receiveWeather.getType(), requestWeatherFailed.getType()])
                //take([receiveForecast.getType(), requestForecastFailed.getType()])
            ]);
        }

        //yield put(setLoadingAnimation(false));
        //yield take(setLoadingAnimationFinished.getType());
        yield put(bootstrapWidgetFinished());
    } catch(error) {
        yield put(bootstrapWidgetFailed());
    }
}

export function* refreshWidgetSaga() {
    try {
        yield put(refreshWidgetStarted());
        yield put(setLoadingAnimation(true));
        yield take(setLoadingAnimationFinished.getType());
        yield all([
            put(fetchWeather()),
            //put(fetchForecast())
        ]);
        const [weatherActType, forecastActType] = yield all([
            take([receiveWeather.getType(), requestWeatherFailed.getType()])
            //take([receiveForecast.getType(), requestForecastFailed.getType()])
        ]);
        yield put(setLoadingAnimation(false));
        yield take(setLoadingAnimationFinished.getType());
        yield put(refreshWidgetFinished());
    } catch(error) {
        yield put(refreshWidgetFailed());
    }

}