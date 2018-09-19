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

    [requestStoreConfiguration]: (state) => ({
        ...state,
        isConfStoring: true
    }),
    [receiveStoreConfiguration]: (state, payload) => ({
        ...state,
        isConfStoring: false
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

    [requestStoreCache]: (state) => ({
        ...state,
        isCacheStoring: true
    }),
    [receiveStoreCache]: (state, payload) => ({
        ...state,
        isCacheStoring: false
    }),
    [requestStoreCacheFailed]: (state, payload) => ({
        ...state,
        isCacheStoring: false,
        error: payload.error
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