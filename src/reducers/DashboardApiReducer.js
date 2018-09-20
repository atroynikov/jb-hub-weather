import { createReducer } from 'redux-act';

import {
    requestFetchConfiguration, receiveFetchConfiguration, requestFetchConfigurationFailed,
    requestStoreConfiguration, receiveStoreConfiguration, requestStoreConfigurationFailed,
    requestFetchCache, receiveFetchCache, requestFetchCacheFailed,
    requestStoreCache, receiveStoreCache, requestStoreCacheFailed
} from '../actions/DashboardApiActions';

const dashboardApiReducer = createReducer({
    [requestFetchConfiguration]: (state) => ({
        ...state,
        config: {
            ...state.config,
            isFetching: true
        }
    }),
    [receiveFetchConfiguration]: (state, payload) => ({
        ...state,
        config: {
            ...state.config,
            isFetching: false,
            data: payload
        }
    }),
    [requestFetchConfigurationFailed]: (state, payload) => ({
        ...state,
        config: {
            ...state.config,
            isConfFetching: false,
            error: payload
        }
    }),

    [requestStoreConfiguration]: (state, payload) => ({
        ...state,
        config: {
            ...state.config,
            isConfStoring: true,
        }
    }),
    [receiveStoreConfiguration]: (state, payload) => ({
        ...state,
        config: {
            ...state.config,
            isConfStoring: false,
            data: payload
        }
    }),
    [requestStoreConfigurationFailed]: (state, payload) => ({
        ...state,
        isConfStoring: false,
        error: payload
    }),

    [requestFetchCache]: (state) => ({
        ...state,
        cache: {
            ...state.cache,
            isFetching: false,
        }
    }),
    [receiveFetchCache]: (state, payload) => ({
        ...state,
        cache: {
            ...state.cache,
            isFetching: false,
            data: payload || {}
        }
    }),
    [requestFetchCacheFailed]: (state, payload) => ({
        ...state,
        cache: {
            ...state.cache,
            isFetching: false,
            error: payload
        }
    }),

    [requestStoreCache]: (state, payload) => ({
        ...state,
        cache: {
            ...state.cache,
            isStoring: true
        }
    }),
    [receiveStoreCache]: (state, payload) => ({
        ...state,
        cache: {
            ...state.cache,
            isStoring: false,
            data: payload
        }
    }),
    [requestStoreCacheFailed]: (state, payload) => ({
        ...state,
        cache: {
            ...state.cache,
            isStoring: false,
            error: payload.error
        }
    })
}, {
    config: {
        isFetching: false
    },
    cache: {
        isFetching: false
    }
});

export default dashboardApiReducer;