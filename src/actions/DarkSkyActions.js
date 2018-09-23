import {createAction} from 'redux-act';

export const fetchDsWeather = createAction('Fetch DarkSky weather');
export const requestDsWeather = createAction('Request DarkSky weather');
export const receiveDsWeather = createAction('Receive DarkSky weather');
export const requestDsWeatherFailed = createAction('Request DarkSky weather failed');

export const fetchDsForecast = createAction('Fetch DarkSky forecast');
export const requestDsForecast = createAction('Request DarkSky forecast');
export const receiveDsForecast = createAction('Receive DarkSky forecast');
export const requestDsForecastFailed = createAction('Request DarkSky forecast failed');
