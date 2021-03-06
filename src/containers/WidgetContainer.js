import React, {Component} from 'react';
import {connect} from 'react-redux';

import {WidgetComponent} from '@components';
import {ConfigurationContainer, ForecastContainer, WeatherContainer} from '@containers';
import {bootstrapWidget} from '@actions/WidgetActions';
import {getConfig} from '@selectors/DashboardApiSelectors';

class WidgetContainer extends Component {
  componentDidMount() {
    this.props.dispatch(bootstrapWidget());
  }

  render() {
    return (
      <WidgetComponent {...this.props}/>
    );
  }
}

export default connect(
  state => ({
    config: getConfig(state),
    configMode: state.configuration.configMode,
    Configuration: ConfigurationContainer,
    Weather: WeatherContainer,
    Forecast: ForecastContainer
  })
)(WidgetContainer);
