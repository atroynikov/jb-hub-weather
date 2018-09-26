import React, {Component} from 'react';
import {connect} from 'react-redux';

import {WeatherComponent} from '@components';

class WeatherContainer extends Component {
  render() {
    return (
      <WeatherComponent {...this.props}/>
    );
  }
}

export default connect(
  state => ({
    weather: state.meteo.weather,
    config: state.dashboardApi.config.data
  }),
  dispatch => ({})
)(WeatherContainer);
