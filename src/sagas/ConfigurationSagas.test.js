import 'babel-polyfill';
import {cloneableGenerator} from 'redux-saga/utils';
import {put, take, getContext, call} from 'redux-saga/effects';
import {
  enterConfigModeSaga, exitConfigModeSaga,
  openConfigurationSaga, saveConfigurationSaga
} from '@sagas/ConfigurationSagas';
import {
  enterConfigMode, enterConfigModeStarted, enterConfigModeFinished, enterConfigModeFailed,
  exitConfigMode, exitConfigModeStarted, exitConfigModeFinished, exitConfigModeFailed,
  openConfiguration, openConfigurationStarted, openConfigurationFinished, openConfigurationFailed,
  saveConfiguration, saveConfigurationStarted, saveConfigurationFinished, saveConfigurationFailed
} from '@actions/ConfigurationActions';
import {
  storeConfig, storeConfigFinished, setTitle
} from '@actions/DashboardApiActions';
import {refreshWidget, refreshWidgetFinished} from '@actions/WidgetActions'
import {WIDGET_TITLE, WIDGET_TITLE_CONFIG} from '@constants';

describe('ConfigurationSaga', () => {
  const config = {config: 123};
  const dashboardApi = {
    enterConfigMode: () => {},
    exitConfigMode: () => {},
  };
  const error = new Error("Type error: error description");

  before(() => {
    sinon.stub(dashboardApi, 'enterConfigMode').resolves();
    sinon.stub(dashboardApi, 'exitConfigMode').resolves();
  });

  describe('enterConfigModeSaga', () => {
    const generator = cloneableGenerator(enterConfigModeSaga)();

    it('should dispatch enterConfigModeStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(enterConfigModeStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.enterConfigMode', () => {
      const result = generator.next(dashboardApi).value;
      result.should.to.eql(call([dashboardApi, 'enterConfigMode']));
    });

    describe('and dashboardApi.enterConfigMode is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch setTitle with WIDGET_TITLE_CONFIG', () => {
        const result = clone.next().value;
        result.should.to.eql(put(setTitle(WIDGET_TITLE_CONFIG)));
      });

      it('should dispatch enterConfigModeFinished', () => {
        const result = clone.next().value;
        result.should.to.eql(put(enterConfigModeFinished()));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.enterConfigModeFinished fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch enterConfigModeFailed', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(enterConfigModeFailed(error.toString())));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('exitConfigModeSaga', () => {
    const generator = cloneableGenerator(exitConfigModeSaga)();

    it('should dispatch exitConfigModeStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(exitConfigModeStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.exitConfigMode', () => {
      const result = generator.next(dashboardApi).value;
      result.should.to.eql(call([dashboardApi, 'exitConfigMode']));
    });

    describe('and dashboardApi.exitConfigMode is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch setTitle with WIDGET_TITLE', () => {
        const result = clone.next().value;
        result.should.to.eql(put(setTitle(WIDGET_TITLE)));
      });

      it('should dispatch exitConfigModeFinished', () => {
        const result = clone.next().value;
        result.should.to.eql(put(exitConfigModeFinished()));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.exitConfigMode fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch exitConfigModeFailed', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(exitConfigModeFailed(error.toString())));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('openConfigurationSaga', () => {
    const generator = cloneableGenerator(openConfigurationSaga)();

    it('should dispatch openConfigurationStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(openConfigurationStarted()));
    });

    it('should dispatch enterConfigMode', () => {
      const result = generator.next().value;
      result.should.to.eql(put(enterConfigMode()));
    });

    it('should wait enterConfigModeFinished', () => {
      const result = generator.next().value;
      result.should.to.eql(take(enterConfigModeFinished.getType()));
    });

    it('should dispatch openConfigurationFinished', () => {
      const result = generator.next().value;
      result.should.to.eql(put(openConfigurationFinished()));
    });

    it('performs no further work', () => {
      const result = generator.next().done;
      result.should.to.equal(true);
    });
  });

  describe('saveConfigurationSaga', () => {
    const generator = cloneableGenerator(saveConfigurationSaga)({payload:config});

    it('should dispatch saveConfigurationStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(saveConfigurationStarted()));
    });

    it('should dispatch storeConfig', () => {
      const result = generator.next().value;
      result.should.to.eql(put(storeConfig(config)));
    });

    it('should wait storeConfigFinished', () => {
      const result = generator.next().value;
      result.should.to.eql(take(storeConfigFinished.getType()));
    });

    it('should dispatch exitConfigMode', () => {
      const result = generator.next().value;
      result.should.to.eql(put(exitConfigMode()));
    });

    it('should wait exitConfigModeFinished', () => {
      const result = generator.next().value;
      result.should.to.eql(take(exitConfigModeFinished.getType()));
    });

    it('should dispatch refreshWidget', () => {
      const result = generator.next().value;
      result.should.to.eql(put(refreshWidget()));
    });

    it('should wait refreshWidgetFinished', () => {
      const result = generator.next().value;
      result.should.to.eql(take(refreshWidgetFinished.getType()));
    });

    it('should dispatch saveConfigurationFinished', () => {
      const result = generator.next().value;
      result.should.to.eql(put(saveConfigurationFinished()));
    });

    it('performs no further work', () => {
      const result = generator.next().done;
      result.should.to.equal(true);
    });
  });
});
