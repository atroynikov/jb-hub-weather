import { createReducer } from 'redux-act';

import {
    requestGeolocation, receiveGeolocation, requestGeolocationFailed,
    requestIpGeolocation, receiveIpGeolocation, requestIpGeolocationFailed
} from '@actions/GeolocationActions';

const geolocationReducer = createReducer({
    [requestGeolocation]: (state) => ({
        ...state,
        geo: {
            isFetching: true
        }
    }),
    [receiveGeolocation]: (state, payload) => ({
        ...state,
        geo: {
            isFetching: false,
            data: payload
        }
    }),
    [requestGeolocationFailed]: (state, payload) => ({
        ...state,
        geo: {
            isFetching: false,
            error: payload.error
        }
    }),

    [requestIpGeolocation]: (state) => ({
        ...state,
        ip: {
            isFetching: true
        }
    }),
    [receiveIpGeolocation]: (state, payload) => ({
        ...state,
        ip: {
            isFetching: false,
            data: payload
        }
    }),
    [requestIpGeolocationFailed]: (state, payload) => ({
        ...state,
        ip: {
            isFetching: false,
            error: payload.error
        }
    })
}, {
    geo: {
        isFetching: false
    },
    ip: {
        isFetching: false
    }
});

export default geolocationReducer;