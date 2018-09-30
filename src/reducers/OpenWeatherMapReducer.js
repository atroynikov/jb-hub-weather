import {createReducer} from 'redux-act';

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
  [receiveOwmForecast]: (state, payload) => {
    let date  = (new Date).getDate();
    let data = payload.list.reduce(function(list, cur) {
      const curDate = (new Date(cur.dt * 1e3)).getDate();
      if (curDate !== date) {
        list.push(cur);
        date = curDate;
      }
      return list;
    }, []);
    return {
      ...state,
      isForecastFetching: false,
      forecast: data
    };
  },
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
