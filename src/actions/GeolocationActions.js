import {createAction} from 'redux-act';

export const fetchGeolocation = createAction('Fetch  geolocation');
export const requestGeolocation = createAction('Request geolocation');
export const receiveGeolocation = createAction('Receive geolocation');
export const requestGeolocationFailed = createAction('Request geolocation failed');