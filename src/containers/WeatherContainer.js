import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle, setDisplayName} from 'recompose';

import WeatherComponent from '../components/WeatherComponent';

const WeatherContainer = compose(
    connect(
        (state) => ({
            weather: state.owmAPI.weather
        }),
        (dispatch) => ({

        })
    ),
    lifecycle({
        componentDidMount(props) {
            console.log('componentDidMount', props);
        }
    }),
    setDisplayName('WeatherContainer')
)(WeatherComponent);

export default WeatherContainer;