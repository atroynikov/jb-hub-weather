import React from 'react';
import {shallow} from 'enzyme';

import
  ConfigurationComponent, {
  LocationSource, PlaceName, Scale
} from '@components/ConfigurationComponent';
import styles from '@components/ConfigurationComponent.css';
import {DataSources, LocationSources} from '@constants';

const props = {
  locSource: LocationSources.GEO,
  placeName: 'Sankt-Peterburg',
  tempScale: 'C',
  showForecast: true,
  forecastDays: '5',
  updateInt: '300',
  dataSource: DataSources.OPEN_WEATHER_MAP,
  owmAppId: '757dd97f4bcba5a5328ebb5395a61384',
  dsSecretKey: 'c538faa3d9d27354adfbab12e2abd0c1'
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
