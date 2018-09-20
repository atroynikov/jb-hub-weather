import React from 'react';
import {connect} from 'react-redux';
import {
    compose, withState, setPropTypes, setDisplayName
} from 'recompose';

import ConfigurationComponent from '../components/ConfigurationComponent';
import {
    saveConfiguration, exitConfigMode
} from '../actions/ConfigurationActions';

const defaultConfig = {
    locSource: 'name',
    placeName: 'Sankt-Peterburg',
    tempScale: 'C',
    showForecast: false,
    forecastDays: '5',
    dataSource: 'owm',
    owmAppId: '757dd97f4bcba5a5328ebb5395a61384',
    dsSecretKey: ''
};

const ConfigurationContainer = compose(
    withState('locSource', 'setLocSource'),
    withState('placeName', 'setPlaceName'),
    withState('tempScale','setTempScale'),
    withState('showForecast', 'setShowForecast'),
    withState('forecastDays', 'setForecastDays'),
    withState('dataSource', 'setDataSource'),
    withState('owmAppId', 'setOwmAppId', ),
    withState('dsSecretKey', 'setDsSecretKey'),
    connect(
        state => ({
            ...defaultConfig,
            ...state.dashboardApi.config.data
        }),
        dispatch => ({
            save: (configuration) => dispatch(saveConfiguration(configuration)),
            cancel: () => dispatch(exitConfigMode())
        }),
        (stateProps, dispatchProps, ownProps) => {
            ownProps= {
                ...ownProps,
                locSource: ownProps.locSource !== []._ ? ownProps.locSource : stateProps.locSource,
                placeName: ownProps.placeName !== []._ ? ownProps.placeName : stateProps.placeName,
                tempScale: ownProps.tempScale !== []._ ? ownProps.tempScale : stateProps.tempScale,
                showForecast: ownProps.showForecast !== []._ ? ownProps.showForecast : stateProps.showForecast,
                forecastDays: ownProps.forecastDays !== []._ ? ownProps.forecastDays : stateProps.forecastDays,
                dataSource: ownProps.dataSource !== []._ ? ownProps.dataSource : stateProps.dataSource,
                owmAppId: ownProps.owmAppId !== []._ ? ownProps.owmAppId : stateProps.owmAppId,
                dsSecretKey: ownProps.dsSecretKey !== []._ ? ownProps.dsSecretKey : stateProps.dsSecretKey
            };
            return ({
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
            });
        }
    ),
    setPropTypes({

    }),
    setDisplayName('ConfigurationContainer')
)(ConfigurationComponent);

export default ConfigurationContainer;