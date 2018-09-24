import React from 'react';
import {mount} from 'enzyme';

import {ConfigurationComponent} from '@components';
import styles from '@components/ConfigurationComponent.css';

describe('ConfigurationComponent', () => {
    const mountConfiguration = props => mount(<ConfigurationComponent {...props}/>);

    it('should render', () => {
        mountConfiguration({}).should.have.type(ConfigurationComponent);
    });
});
