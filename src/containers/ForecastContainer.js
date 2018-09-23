import React from 'react';
import {connect} from 'react-redux';
import {compose, setDisplayName} from 'recompose';

import ForecastComponent from '@components/ForecastComponent';

const ForecastContainer = compose(
    connect(
        (state) => ({
            forecast: state.forecast,
            config: state.dashboardApi.config.data
        }),
        (dispatch) => ({

        })
    ),
    setDisplayName('ForecastContainer')
)(ForecastComponent);

export default ForecastContainer;