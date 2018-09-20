import React from 'react';
import {connect} from 'react-redux';
import {compose, setDisplayName} from 'recompose';

import WeatherComponent from '../components/WeatherComponent';

const WeatherContainer = compose(
    connect(
        (state) => ({
            weather: state.meteo.weather
        }),
        (dispatch) => ({

        })
    ),
    setDisplayName('WeatherContainer')
)(WeatherComponent);

export default WeatherContainer;