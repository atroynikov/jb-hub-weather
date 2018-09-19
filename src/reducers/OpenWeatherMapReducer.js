import { createReducer } from 'redux-act';

import {
    requestWeather, receiveWeather, requestWeatherFailed,
    requestForecast, receiveForecast, requestForecastFailed
} from '../actions/OpenWeatherMapActions';

const openWeatherMapReducer = createReducer({
    [requestWeather]: (state) => Object.assign({}, state, {
        isWeatherFetching: true,
    }),
    [receiveWeather]: (state, payload) => Object.assign({}, state, {
        isWeatherFetching: false,
        weather: payload
    }),
    [requestWeatherFailed]: (state, payload) => Object.assign({}, state, {
        isWeatherFetching: false,
        error: payload.error
    }),

    [requestForecast]: (state) => Object.assign({}, state, {
        isForecastFetching: true,
    }),
    [receiveForecast]: (state, payload) => Object.assign({}, state, {
        isForecastFetching: false,
        data: payload.json
    }),
    [requestForecastFailed]: (state, payload) => Object.assign({}, state, {
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