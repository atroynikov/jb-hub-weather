import React from 'react';
import {shallow} from 'enzyme';
import {createMockStore} from 'redux-test-utils';

import {WidgetContainer} from '@containers';

describe('WidgetContainer', () => {
  it('should render with empty store', () => {
    const store = createMockStore({
      dashboardApi: {config: {data: null}},
      configuration: {configMode: false}
    });
    const shallowWidget = shallow(<WidgetContainer/>, {context: {store}});

    shallowWidget({}).should.have.type(WidgetContainer);
  });
});
