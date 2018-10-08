import React from 'react';
import {shallow} from 'enzyme';

import
  ConfigurationComponent, {
  LocationSource, PlaceName, Scale
} from '@components/ConfigurationComponent';
import styles from '@components/ConfigurationComponent.css';
import {
  DataSources, LocationSources, UnitsFormats
} from '@constants';

const props = {
  locSource: LocationSources.GEO,
  placeName: 'Sankt-Peterburg',
  unitss: UnitsFormats.METRIC,
  showForecast: true,
  forecastDays: '5',
  updateInt: '300',
  dataSource: DataSources.OPEN_WEATHER_MAP,
  owmAppId: 'abcdefgh',
  dsSecretKey: 'abcdefgh'
};

describe('ConfigurationComponent', () => {
  const shallowConfiguration = props => shallow(<ConfigurationComponent {...props}/>);

  it('should render', () => {
    shallowConfiguration({}).should.have.type(ConfigurationComponent);
  });

  describe('LocationSource', () => {
    const shallowLocationSource = shallow(<LocationSource {...props}/>)

    it('should render', () => {
      shallowLocationSource({}).should.have.type(LocationSource);
    })
  });
});
