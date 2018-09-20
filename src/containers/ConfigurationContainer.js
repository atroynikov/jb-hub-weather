import React from 'react';
import {connect} from 'react-redux';
import {
    compose, withState, setPropTypes, setDisplayName
} from 'recompose';

import ConfigurationComponent from '../components/ConfigurationComponent';
import {
    saveConfiguration, exitConfigMode
} from '../actions/ConfigurationActions';

const ConfigurationContainer = compose(
    withState('locSource', 'setLocSource', 'name'),
    withState('placeName', 'setPlaceName', ''),
    withState('tempScale','setTempScale', 'C'),
    withState('showForecast', 'setShowForecast', false),
    withState('forecastDays', 'setForecastDays', '5'),
    withState('dataSource', 'setDataSource', 'owm'),
    withState('owmAppId', 'setOwmAppId', '757dd97f4bcba5a5328ebb5395a61384'),
    withState('dsSecretKey', 'setDsSecretKey', ''),
    connect(
        state => ({...state.configuration}),
        dispatch => ({
            save: (configuration) => dispatch(saveConfiguration(configuration)),
            cancel: () => dispatch(exitConfigMode())
        }),
        (stateProps, dispatchProps, ownProps) => ({
            ...stateProps,
            ...ownProps,
            onSave: () => dispatchProps.save({
                locSource: ownProps.locSource,
                placeName: ownProps.placeName,
                tempScale: ownProps.tempScale,
                showForecast: ownProps.showForecast,
                forecastDays: parseInt(ownProps.forecastDays, 10),
                dataSource: ownProps.dataSource,
                owmAppId: ownProps.owmAppId,
                dsSecretKey: ownProps.dsSecretKey
            }),
            onCancel: () => dispatchProps.cancel(),
        })
    ),
    setPropTypes({

    }),
    setDisplayName('ConfigurationContainer')
)(ConfigurationComponent);

export default ConfigurationContainer;