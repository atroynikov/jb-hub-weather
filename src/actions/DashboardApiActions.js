import {createAction} from 'redux-act';

export const fetchCache = createAction('Fetch widget cache');
export const requestFetchCache = createAction('Request fetch widget cache');
export const receiveFetchCache = createAction('Receive fetch widget cache');
export const requestFetchCacheFailed = createAction('Request fetch widget cache failed');

export const storeCache = createAction('Store widget cache');
export const requestStoreCache = createAction('Request store widget cache');
export const receiveStoreCache= createAction('Receive store widget cache');
export const requestStoreCacheFailed = createAction('Request store widget cache failed');

export const fetchConfiguration = createAction('Fetch widget configuration');
export const requestFetchConfiguration = createAction('Request fetch widget configuration');
export const receiveFetchConfiguration = createAction('Receive fetch widget configuration');
export const requestFetchConfigurationFailed = createAction('Request fetch widget configuration failed');

export const storeConfiguration = createAction('Store widget configuration');
export const requestStoreConfiguration = createAction('Request store widget configuration');
export const receiveStoreConfiguration= createAction('Receive store widget configuration');
export const requestStoreConfigurationFailed = createAction('Request store widget configuration failed');

export const setTitle = createAction('Set widget title', (...args) => args.join("\0"));
export const setTitleStarted = createAction('Started setting widget title');
export const setTitleFinished = createAction('Finished setting widget title');
export const setTitleFailed = createAction('Failed setting widget title');

export const setLoadingAnimation = createAction('Set loading animation');
export const setLoadingAnimationStarted = createAction('Started setting loading animation');
export const setLoadingAnimationFinished = createAction('Finished setting loading animation');
export const setLoadingAnimationFailed = createAction('Failed setting loading animation');
