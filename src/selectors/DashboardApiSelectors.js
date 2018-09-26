import {createSelector} from 'reselect';

export const getConfig = state => state.dashboardApi.config.data;
export const getCache = state => state.dashboardApi.cache.data;
export const getTitle = state => state.dashboardApi.title.data;
export const getLoadingAnimation = state => state.dashboardApi.loadingAnimation.data;
