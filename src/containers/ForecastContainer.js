import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ForecastComponent} from '@components';

class ForecastContainer extends Component {
  render() {
    return (
      <ForecastComponent {...this.props}/>
    );
  }
}

export default connect(
  state => ({
    forecast: state.meteo.forecast,
    config: state.dashboardApi.config.data
  }),
  dispatch => ({})
)(ForecastContainer);
