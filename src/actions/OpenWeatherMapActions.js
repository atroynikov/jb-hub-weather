import {createAction} from 'redux-act';

export const fetchWeather = createAction('Fetch OWM weather');
export const requestWeather = createAction('Request OWM weather');
export const receiveWeather = createAction('Receive OWM weather');
export const requestWeatherFailed = createAction('Request OWM weather failed');

export const fetchForecast = createAction('Fetch OWM forecast');
export const requestForecast = createAction('Request OWM forecast');
export const receiveForecast = createAction('Receive OWM forecast');
export const requestForecastFailed = createAction('Request OWM forecast failed');