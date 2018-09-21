import {createAction} from 'redux-act';

export const fetchGeolocation = createAction('Fetch geolocation');
export const requestGeolocation = createAction('Request geolocation');
export const receiveGeolocation = createAction('Receive geolocation');
export const requestGeolocationFailed = createAction('Request geolocation failed');

export const fetchIpGeolocation = createAction('Fetch IP geolocation');
export const requestIpGeolocation = createAction('Request IP geolocation');
export const receiveIpGeolocation = createAction('Receive IP geolocation');
export const requestIpGeolocationFailed = createAction('Request IP geolocation failed');