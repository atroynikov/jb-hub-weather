import React from 'react';
import {connect} from 'react-redux';
import {compose, setDisplayName} from 'recompose';

import {WeatherComponent} from '@components';

const WeatherContainer = compose(
    connect(
        (state) => ({
            weather: state.meteo.weather,
            config: state.dashboardApi.config.data
        }),
        (dispatch) => ({

        })
    ),
    setDisplayName('WeatherContainer')
)(WeatherComponent);

export default WeatherContainer;
