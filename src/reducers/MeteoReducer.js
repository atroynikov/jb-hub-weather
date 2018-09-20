import { createReducer } from 'redux-act';

import {
    fetchWeather, fetchWeatherStarted, fetchWeatherFinished, fetchWeatherFailed,
    fetchForecast, fetchForecastStarted, fetchForecastFinished, fetchForecastFailed
} from '../actions/MeteoActions';

const meteoReducer = createReducer({
    [fetchWeather]: (state) => ({
        ...state,
        isWeatherFetching: false,
    }),
    [fetchWeatherStarted]: (state) => ({
        ...state,
        isWeatherFetching: true,
    }),
    [fetchWeatherFinished]: (state, payload) => ({
        ...state,
        isWeatherFetching: false,
        weather: payload
    }),
    [fetchWeatherFailed]: (state, payload) => ({
        ...state,
        isWeatherFetching: false,
    })
}, {
    isWeatherFetching: false,
    weather: {},
    isForecastFetching: false,
    forecast: {}

});

export default meteoReducer;