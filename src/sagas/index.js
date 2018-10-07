import {all, setContext} from 'redux-saga/effects';

import widgetSagas from './WidgetSagas';
import dashboardApiSagas from './DashboardApiSagas';
import configurationSagas from './ConfigurationSagas';
import meteoSagas from './MeteoSagas';
import teleportSagas from './TeleportSagas';
import geolocationSagas from './GeolocationSagas';

function* rootSaga(dispatch) {
  yield setContext({dispatch});
  yield all([
    ...widgetSagas,
    ...dashboardApiSagas,
    ...configurationSagas,
    ...meteoSagas,
    ...teleportSagas,
    ...geolocationSagas
  ]);
}

export default rootSaga;
