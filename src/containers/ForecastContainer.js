import React from 'react';
import {connect} from 'react-redux';
import {compose, setDisplayName} from 'recompose';

import {ForecastComponent} from '@components';

const ForecastContainer = compose(
  connect(
    state => ({
      forecast: state.meteo.forecast,
      config: state.dashboardApi.config.data
    }),
    dispatch => ({})
  ),
  setDisplayName('ForecastContainer')
)(ForecastComponent);

export default ForecastContainer;
