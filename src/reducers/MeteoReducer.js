import { createReducer } from 'redux-act';

import {
    fetchWeather, fetchWeatherStarted, fetchWeatherFinished, fetchWeatherFailed,
    fetchForecast, fetchForecastStarted, fetchForecastFinished, fetchForecastFailed
} from '@actions/MeteoActions';

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
    }),

    [fetchForecast]: (state) => ({
        ...state,
        isForecastFetching: false,
    }),
    [fetchForecastStarted]: (state) => ({
        ...state,
        isForecastFetching: true,
    }),
    [fetchForecastFinished]: (state, payload) => ({
        ...state,
        isForecastFetching: false,
        forecast: payload
    }),
    [fetchForecastFailed]: (state, payload) => ({
        ...state,
        isForecastFetching: false,
    }),
}, {
    isWeatherFetching: false,
    weather: {},
    isForecastFetching: false,
    forecast: {}
});

export default meteoReducer;