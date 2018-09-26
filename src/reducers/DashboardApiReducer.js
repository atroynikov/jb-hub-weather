import {createReducer} from 'redux-act';

import {
  readConfigStarted, readConfigFinished, readConfigFailed,
  storeConfigStarted, storeConfigFinished, storeConfigFailed,
  readCache, readCacheStarted, readCacheFinished, readCacheFailed,
  storeCache, storeCacheStarted, storeCacheFinished, storeCacheFailed,
  setTitle, setTitleStarted, setTitleFinished, setTitleFailed,
  setLoadingAnimation, setLoadingAnimationStarted, setLoadingAnimationFinished, setLoadingAnimationFailed,
  alert, alertStarted, alertFinished, alertFailed
} from '@actions/DashboardApiActions';
import {ActionStates} from '@constants'

const dashboardApiReducer = createReducer({
  [readConfigStarted]: (state) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: true
    }
  }),
  [readConfigFinished]: (state, payload) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      data: payload
    }
  }),
  [readConfigFailed]: (state, payload) => ({
    ...state,
    config: {
      ...state.config,
      isConfFetching: false,
      error: payload
    }
  }),

  [storeConfigStarted]: (state, payload) => ({
    ...state,
    config: {
      ...state.config,
      isConfStoring: true,
    }
  }),
  [storeConfigFinished]: (state, payload) => ({
    ...state,
    config: {
      ...state.config,
      isConfStoring: false,
      data: payload
    }
  }),
  [storeConfigFailed]: (state, payload) => ({
    ...state,
    isConfStoring: false,
    error: payload
  }),

  [readCache]: (state) => ({
    ...state,
    cache: {
      ...state.cache,
      readState: ActionStates.CALLED,
      storeState: ActionStates.IDLED
    }
  }),
  [readCacheStarted]: (state) => ({
    ...state,
    cache: {
      ...state.cache,
      readState: ActionStates.STARTED,
    }
  }),
  [readCacheFinished]: (state, payload) => ({
    ...state,
    cache: {
      ...state.cache,
      data: payload || {},
      readState: ActionStates.FINISHED,
    }
  }),
  [readCacheFailed]: (state, payload) => ({
    ...state,
    cache: {
      ...state.cache,
      error: payload,
      readState: ActionStates.FAILED,
    }
  }),

  [storeCache]: (state, payload) => ({
    ...state,
    cache: {
      ...state.cache,
      data: payload,
      storeState: ActionStates.CALLED,
      readState: ActionStates.IDLED,
    }
  }),
  [storeCacheStarted]: (state, payload) => ({
    ...state,
    cache: {
      ...state.cache,
      storeState: ActionStates.STARTED
    }
  }),
  [storeCacheFinished]: (state, payload) => ({
    ...state,
    cache: {
      ...state.cache,
      storeState: ActionStates.FINISHED
    }
  }),
  [storeCacheFailed]: (state, payload) => ({
    ...state,
    cache: {
      ...state.cache,
      error: payload,
      storeState: ActionStates.FAILED
    }
  }),

  [setTitle]: (state, payload) => ({
    ...state,
    title: {
      ...state.title,
      data: payload,
      state: ActionStates.CALLED
    }
  }),
  [setTitleStarted]: (state, payload) => ({
    ...state,
    title: {
      ...state.title,
      state: ActionStates.STARTED
    }
  }),
  [setTitleFinished]: (state, payload) => ({
    ...state,
    title: {
      ...state.title,
      state: ActionStates.FINISHED
    }
  }),
  [setTitleFailed]: (state, payload) => ({
    ...state,
    title: {
      ...state.title,
      state: ActionStates.FAILED
    }
  }),

  [setLoadingAnimation]: (state) => ({
    ...state,
    loadingAnimation: {
      ...state.title,
      state: ActionStates.CALLED
    }
  }),
  [setLoadingAnimationStarted]: (state, payload) => ({
    ...state,
    loadingAnimation: {
      ...state.title,
      state: ActionStates.STARTED
    }
  }),
  [setLoadingAnimationFinished]: (state, payload) => ({
    ...state,
    loadingAnimation: {
      ...state.title,
      state: ActionStates.FINISHED
    }
  }),
  [setLoadingAnimationFailed]: (state, payload) => ({
    ...state,
    loadingAnimation: {
      ...state.title,
      state: ActionStates.FAILED
    }
  }),

  [alert]: (state) => ({
    ...state,
    alert: {
      ...state.title,
      state: ActionStates.CALLED
    }
  }),
  [alertStarted]: (state, payload) => ({
    ...state,
    alert: {
      ...state.title,
      state: ActionStates.STARTED
    }
  }),
  [alertFinished]: (state, payload) => ({
    ...state,
    alert: {
      ...state.title,
      state: ActionStates.FINISHED
    }
  }),
  [alertFailed]: (state, payload) => ({
    ...state,
    alert: {
      ...state.title,
      state: ActionStates.FAILED
    }
  }),
}, {
  config: {
    isFetching: false
  },
  cache: {
    data: null,
    readState: ActionStates.IDLED,
    storeState: ActionStates.IDLED
  },
  title: {
    data: null,
    state: ActionStates.IDLED
  },
  loadingAnimation: {
    data: null,
    state: ActionStates.IDLED
  },
  alert: {
    data: null,
    state: ActionStates.IDLED
  }
});

export default dashboardApiReducer;
