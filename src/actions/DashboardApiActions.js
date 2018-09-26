import {createAction} from 'redux-act';

export const readConfig = createAction('Read widget configuration');
export const readConfigStarted = createAction('Started reading widget configuration');
export const readConfigFinished = createAction('Finished reading widget configuration');
export const readConfigFailed = createAction('Failed reading widget configuration');

export const storeConfig = createAction('Store widget configuration');
export const storeConfigStarted = createAction('Started storing widget configuration');
export const storeConfigFinished = createAction('Finished storing widget configuration');
export const storeConfigFailed = createAction('Failed storing widget configuration');

export const readCache = createAction('Read widget cache');
export const readCacheStarted = createAction('Started reading widget cache');
export const readCacheFinished = createAction('Finished reading widget cache');
export const readCacheFailed = createAction('Failed reading widget cache');

export const storeCache = createAction('Store widget cache');
export const storeCacheStarted = createAction('Started storing widget cache');
export const storeCacheFinished = createAction('Finished storing widget cache');
export const storeCacheFailed = createAction('Failed storing widget cache');

export const setTitle = createAction('Set widget title', (...args) => args.join("\0"));
export const setTitleStarted = createAction('Started setting widget title');
export const setTitleFinished = createAction('Finished setting widget title');
export const setTitleFailed = createAction('Failed setting widget title');

export const setLoadingAnimation = createAction('Set widget loading animation');
export const setLoadingAnimationStarted = createAction('Started setting widget loading animation');
export const setLoadingAnimationFinished = createAction('Finished setting widget loading animation');
export const setLoadingAnimationFailed = createAction('Failed setting widget loading animation');

export const alert = createAction("Trigger alert", (...args) => args.join("\0"));
export const alertStarted = createAction("Started triggering alert");
export const alertFinished = createAction("Finished triggering alert");
export const alertFailed = createAction("Failed triggering alert");
