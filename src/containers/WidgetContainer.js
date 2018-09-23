import React from 'react';
import {connect} from 'react-redux';
import {
    compose, lifecycle, setDisplayName
} from 'recompose';

import WidgetComponent from '@components/WidgetComponent';
import ConfigurationContainer from './ConfigurationContainer';
import WeatherContainer from './WeatherContainer';
import ForecastContainer from './ForecastContainer';

import {bootstrapWidget} from '@actions/WidgetActions';

const WidgetContainer = compose(
    connect(
        (state) => ({
            config: state.dashboardApi.config,
            configMode: state.configuration.configMode,
            Configuration: ConfigurationContainer,
            Weather: WeatherContainer,
            Forecast: ForecastContainer
        }),
        dispatch => ({
            bootstrapWidget: () => dispatch(bootstrapWidget())
        })
    ),
    lifecycle({
        componentDidMount() {
            this.props.bootstrapWidget();
        }
    }),
    setDisplayName('WidgetContainer')
)(WidgetComponent);

export default WidgetContainer;
