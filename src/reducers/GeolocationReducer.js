import { createReducer } from 'redux-act';

import {
    requestGeolocation, receiveGeolocation, requestGeolocationFailed,
} from '../actions/GeolocationActions';

const geolocationReducer = createReducer({
    [requestGeolocation]: (state) => Object.assign({}, state, {
        isFetching: true,
    }),
    [receiveGeolocation]: (state, payload) => Object.assign({}, state, {
        isFetching: false,
        data: payload.json
    }),
    [requestGeolocationFailed]: (state, payload) => Object.assign({}, state, {
        isFetching: false,
        error: payload.error
    })
}, {
    isFetching: false
});

export default geolocationReducer;