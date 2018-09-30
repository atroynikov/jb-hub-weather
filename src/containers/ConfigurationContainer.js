import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ConfigurationComponent} from '@components';
import {saveConfiguration, exitConfigMode} from '@actions/ConfigurationActions';
import {getConfig} from '@selectors/DashboardApiSelectors';
import {LocationSources, DataSources} from '@constants';

class ConfigurationContainer extends Component {
  constructor(props) {
    super(props);

    const {
      locSource, placeName, tempScale, showForecast, forecastDays,
      updateInt, dataSource, owmAppId, dsSecretKey
    } = props;
    this.state = {
      locSource, placeName, tempScale, showForecast, forecastDays,
      updateInt, dataSource, owmAppId, dsSecretKey
    };
    this.setLocSource = this.setLocSource.bind(this);
    this.setPlaceName = this.setPlaceName.bind(this);
    this.setTempScale = this.setTempScale.bind(this);
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

  setTempScale(value) {
    this.setState(prevState => ({
      ...prevState,
      tempScale: value
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
      setTempScale: this.setTempScale,
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
  tempScale: 'C', //Change to System of Units
  showForecast: false,
  forecastDays: '5',
  updateInt: '300',
  dataSource: DataSources.OPEN_WEATHER_MAP,
  owmAppId: '757dd97f4bcba5a5328ebb5395a61384',
  dsSecretKey: 'c538faa3d9d27354adfbab12e2abd0c1'
};

export default connect(
  state => getConfig(state)
)(ConfigurationContainer);
