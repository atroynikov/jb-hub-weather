import React, {Component} from 'react';
import {connect} from 'react-redux';

import {WidgetComponent} from '@components';
import {ConfigurationContainer, ForecastContainer, WeatherContainer} from '@containers';
import {bootstrapWidget} from '@actions/WidgetActions';

class WidgetContainer extends Component {
  componentDidMount() {
    this.props.bootstrapWidget();
  }

  render() {
    return (
      <WidgetComponent {...this.props}/>
    );
  }
}

export default connect(
  state => ({
    config: state.dashboardApi.config.data,
    configMode: state.configuration.configMode,
    Configuration: ConfigurationContainer,
    Weather: WeatherContainer,
    Forecast: ForecastContainer
  }),
  dispatch => ({
    bootstrapWidget: () => dispatch(bootstrapWidget())
  })
)(WidgetContainer);
