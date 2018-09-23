import {createSelector} from 'reselect';

export const getIpGeoData = state => state.geolocationApi.ip.data;