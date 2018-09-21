import { createReducer } from 'redux-act';

import {
    requestOwmWeather, receiveOwmWeather, requestOwmWeatherFailed,
    requestOwmForecast, receiveOwmForecast, requestOwmForecastFailed
} from '@actions/OpenWeatherMapActions';

const openWeatherMapReducer = createReducer({
    [requestOwmWeather]: (state) => ({
        ...state,
        isWeatherFetching: true,
    }),
    [receiveOwmWeather]: (state, payload) => ({
        ...state,
        isWeatherFetching: false,
        weather: payload
    }),
    [requestOwmWeatherFailed]: (state, payload) => ({
        ...state,
        isWeatherFetching: false,
        error: payload.error
    }),

    [requestOwmForecast]: (state) => ({
        ...state,
        isForecastFetching: true,
    }),
    [receiveOwmForecast]: (state, payload) => ({
        ...state,
        isForecastFetching: false,
        data: payload.json
    }),
    [requestOwmForecastFailed]: (state, payload) => ({
        ...state,
        isForecastFetching: false,
        error: payload.error
    })
}, {
    isWeatherFetching: false,
    weather: {},
    isForecastFetching: false,
    forecast: {}
});

export default openWeatherMapReducer;