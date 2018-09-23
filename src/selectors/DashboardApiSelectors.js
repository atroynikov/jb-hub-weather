import {createSelector} from 'reselect';

export const getConfig = state => state.dashboardApi.config.data;