import {combineReducers} from 'redux';

import dashboardApiReducer from './DashboardApiReducer';
import configurationReducer from './ConfigurationReducer';
import geolocationReducer from './GeolocationReducer';
import meteoReducer from './MeteoReducer';
import openWeatherMapReducer from './OpenWeatherMapReducer';
import teleportReducer from './TeleportReducer';

const rootReducer = combineReducers({
  configuration: configurationReducer,
  dashboardApi: dashboardApiReducer,
  geolocationApi: geolocationReducer,
  meteo: meteoReducer,
  owmAPI: openWeatherMapReducer,
  teleportAPI: teleportReducer
});

export default rootReducer;
