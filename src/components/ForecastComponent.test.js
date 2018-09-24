import React from 'react';
import {mount} from 'enzyme';

import {ForecastComponent} from '@components';
import styles from '@components/ForecastComponent.css';

describe('ForecastComponent', () => {
    const mountForecast = props => mount(<ForecastComponent {...props}/>);

    it('should render', () => {
        mountForecast({}).should.have.type(ForecastComponent);
    });
});
