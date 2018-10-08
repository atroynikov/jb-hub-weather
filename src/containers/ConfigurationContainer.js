import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ConfigurationComponent} from '@components';
import {saveConfiguration, exitConfigMode} from '@actions/ConfigurationActions';
import {getConfig} from '@selectors/DashboardApiSelectors';
import {
  LocationSources, DataSources, UnitsFormats, ApiKeys
} from '@constants';

class ConfigurationContainer extends Component {
  constructor(props) {
    super(props);

    const {
      locSource, placeName, unitsFormat, showForecast, forecastDays,
      updateInt, dataSource, owmAppId, dsSecretKey
    } = props;
    this.state = {
      locSource, placeName, unitsFormat, showForecast, forecastDays,
      updateInt, dataSource, owmAppId, dsSecretKey
    };
    this.setLocSource = this.setLocSource.bind(this);
    this.setPlaceName = this.setPlaceName.bind(this);
    this.setUnitsFormat = this.setUnitsFormat.bind(this);
    this.setShowForecast = this.setShowForecast.bind(this);
    this.setForecastDays = this.setForecastDays.bind(this);
    this.setUpdateInt = this.setUpdateInt.bind(this);
    this.setDataSource = this.setDataSource.bind(this);
    this.setOwmAppId = this.setOwmAppId.bind(this);
    this.setDsSecretKey = this.setDsSecretKey.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  setLocSource(value) {
    this.setState(prevState => ({
      ...prevState,
      locSource: value
    }));
  }

  setPlaceName(value) {
    this.setState(prevState => ({
      ...prevState,
      placeName: value
    }));
  }

  setUnitsFormat(value) {
    this.setState(prevState => ({
      ...prevState,
      unitsFormat: value
    }));
  }

  setShowForecast(value) {
    this.setState(prevState => ({
      ...prevState,
      showForecast: value
    }));
  }

  setForecastDays(value) {
    this.setState(prevState => ({
      ...prevState,
      forecastDays: value
    }));
  }

  setUpdateInt(value) {
    this.setState(prevState => ({
      ...prevState,
      updateInt: value
    }));
  }

  setDataSource(value) {
    this.setState(prevState => ({
      ...prevState,
      dataSource: value
    }));
  }

  setOwmAppId(value) {
    this.setState(prevState => ({
      ...prevState,
      owmAppId: value
    }));
  }

  setDsSecretKey(value) {
    this.setState(prevState => ({
      ...prevState,
      dsSecretKey: value
    }));
  }

  onSave() {
    this.props.dispatch(saveConfiguration(this.state));
  }

  onCancel() {
    this.props.dispatch(exitConfigMode());
  }

  render() {
    const props = {
      ...{},
      ...this.state,
      setLocSource: this.setLocSource,
      setPlaceName: this.setPlaceName,
      setUnitsFormat: this.setUnitsFormat,
      setShowForecast: this.setShowForecast,
      setForecastDays: this.setForecastDays,
      setUpdateInt: this.setUpdateInt,
      setDataSource: this.setDataSource,
      setOwmAppId: this.setOwmAppId,
      setDsSecretKey: this.setDsSecretKey,
      onSave: this.onSave,
      onCancel: this.onCancel
    };
    return (
      <ConfigurationComponent {...props}/>
    );
  }
}

ConfigurationContainer.defaultProps = {
  locSource: LocationSources.GEO,
  placeName: 'Sankt-Peterburg',
  unitsFormat: UnitsFormats.METRIC,
  showForecast: true,
  forecastDays: '5',
  updateInt: '300',
  dataSource: DataSources.OPEN_WEATHER_MAP,
  owmAppId: ApiKeys.OPEN_WEATHER_MAP,
  dsSecretKey: ApiKeys.DARK_SKY
};

export default connect(
  state => getConfig(state)
)(ConfigurationContainer);
