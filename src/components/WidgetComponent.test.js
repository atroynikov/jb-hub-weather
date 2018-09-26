import React from 'react';
import {mount} from 'enzyme';

import {WidgetComponent} from '@components';
import styles from '@components/WidgetComponent.css';

describe('WidgetComponent', () => {
  const mountWidget = props => mount(<WidgetComponent {...props}/>);

  it('should render', () => {
    mountWidget({}).should.have.type(WidgetComponent);
  });
});
