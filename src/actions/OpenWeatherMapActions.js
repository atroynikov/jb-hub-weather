import {createAction} from 'redux-act';

export const fetchOwmWeather = createAction('Fetch OWM weather');
export const requestOwmWeather = createAction('Request OWM weather');
export const receiveOwmWeather = createAction('Receive OWM weather');
export const requestOwmWeatherFailed = createAction('Request OWM weather failed');

export const fetchOwmForecast = createAction('Fetch OWM forecast');
export const requestOwmForecast = createAction('Request OWM forecast');
export const receiveOwmForecast = createAction('Receive OWM forecast');
export const requestOwmForecastFailed = createAction('Request OWM forecast failed');
