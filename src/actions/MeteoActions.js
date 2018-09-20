import {createAction} from 'redux-act';

export const fetchWeather = createAction('Fetch weather from remote data source');
export const fetchWeatherStarted = createAction('Started fetching weather from remote data source');
export const fetchWeatherFinished = createAction('Finished fetching weather from remote data source');
export const fetchWeatherFailed = createAction('Failed fetching weather from remote data source');

export const fetchForecast = createAction('Fetch forecast from remote data source');
export const fetchForecastStarted = createAction('Started fetching forecast from remote data source');
export const fetchForecastFinished = createAction('Finished fetching forecast from remote data source');
export const fetchForecastFailed = createAction('Failed fetching forecast from remote data source');