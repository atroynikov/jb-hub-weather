import React from 'react';
import {mount} from 'enzyme';

import {WeatherComponent} from '@components';
import styles from '@components/WeatherComponent.css';

describe('WeatherComponent', () => {
    const mountWeather = props => mount(<WeatherComponent {...props}/>);

    it('should render', () => {
        mountWeather({}).should.have.type(WeatherComponent);
    });
});
