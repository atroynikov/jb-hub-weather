import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from 'redux-logger';

import rootReducer from './reducers';
import rootSaga from './sagas';

import HubDashboardAddons from 'hub-dashboard-addons';
import WidgetContainer from './containers/WidgetContainer';

HubDashboardAddons.registerWidget((dashboardApi, registerWidgetApi) => {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        {},
        composeEnhancers(applyMiddleware(
            sagaMiddleware,
            loggerMiddleware
        ))
    );

    sagaMiddleware.run(rootSaga, store.dispatch, dashboardApi, registerWidgetApi);
    ReactDOM.render(
        <Provider store={store}>
            <WidgetContainer/>
        </Provider>,
        document.getElementById('app')
    );
});