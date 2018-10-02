import 'babel-polyfill';
import {cloneableGenerator} from 'redux-saga/utils';
import {put, getContext, call} from 'redux-saga/effects';
import {
  readConfigSaga, storeConfigSaga,
  readCacheSaga, storeCacheSaga,
  setTitleSaga,
  setLoadingAnimationSaga,
  alertSaga
} from '@sagas/DashboardApiSagas';
import {
  readConfigStarted, readConfigFinished, readConfigFailed,
  storeConfigStarted, storeConfigFinished, storeConfigFailed,
  readCacheStarted, readCacheFinished, readCacheFailed,
  storeCacheStarted, storeCacheFinished, storeCacheFailed,
  setTitleStarted, setTitleFinished, setTitleFailed,
  setLoadingAnimationStarted, setLoadingAnimationFinished, setLoadingAnimationFailed,
  alertStarted, alertFinished, alertFailed
} from '@actions/DashboardApiActions';

describe('DashboardApiSagas', () => {
  const config = {config: 123};
  const cache = {cache: 123};
  const dashboardApi = {
    readConfig: () => {},
    storeConfig: () => {},
    readCache: () => {},
    storeCache: () => {},
    setTitle: () => {},
    setLoadingAnimation: () => {},
    alert: () => {},
  };
  const error = new Error("Type error: error description");

  before(() => {
    sinon.stub(dashboardApi, 'readConfig').resolves();
    sinon.stub(dashboardApi, 'storeConfig').resolves();
    sinon.stub(dashboardApi, 'readCache').resolves();
    sinon.stub(dashboardApi, 'storeCache').resolves();
    sinon.stub(dashboardApi, 'setTitle').resolves();
    sinon.stub(dashboardApi, 'setLoadingAnimation').resolves();
    sinon.stub(dashboardApi, 'alert').resolves();
  });

  describe('readConfigSaga', () => {
    const generator = cloneableGenerator(readConfigSaga)();

    it('should dispatch readConfigStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(readConfigStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.readConfig', () => {
      const result = generator.next().value;
      result.should.to.eql(call([dashboardApi, 'readConfig']));
    });

    describe('and dashboardApi.readConfig is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises success action', () => {
        const result = clone.next(config).value;
        result.should.to.eql(put(readConfigFinished(config)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.readConfig fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises failed action', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(readConfigFailed(error)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('storeConfigSaga', () => {
    const generator = cloneableGenerator(storeConfigSaga)(config);

    it('should dispatch storeConfigStarted', () => {
      const result = generator.next(config).value;
      result.should.to.eql(put(storeConfigStarted(config)));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.storeConfig', () => {
      const result = generator.next().value;

      result.should.to.eql(call([dashboardApi, 'storeConfig'], config));
    });

    describe('and dashboardApi.storeConfig is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises success action', () => {
        const result = clone.next(config).value;
        result.should.to.eql(put(storeConfigFinished(config)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.storeConfig fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises failed action', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(storeConfigFailed(error)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('readCacheSaga', () => {
    const generator = cloneableGenerator(readCacheSaga)();

    it('should dispatch readCacheStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(readCacheStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.readCache', () => {
      const result = generator.next().value;
      result.should.to.eql(call([dashboardApi, 'readCache']));
    });

    describe('and dashboardApi.readCache is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises success action', () => {
        const result = clone.next(cache).value;
        result.should.to.eql(put(readCacheFinished(cache)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.readCache fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises failed action', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(readCacheFailed(error)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('storeCacheSaga', () => {
    const generator = cloneableGenerator(storeCacheSaga)(cache);

    it('should dispatch storeCacheStarted', () => {
      const result = generator.next(config).value;
      result.should.to.eql(put(storeCacheStarted(cache)));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.storeCache', () => {
      const result = generator.next().value;

      result.should.to.eql(call([dashboardApi, 'storeCache'], cache));
    });

    describe('and dashboardApi.storeCache is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises success action', () => {
        const result = clone.next(config).value;
        result.should.to.eql(put(storeCacheFinished(cache)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.storeCache fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises failed action', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(storeConfigFaileda(error)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('setTitleSaga', () => {
    const [titleLabel, titleUrl] = ['JetBrains', 'https://jetbrains.com/'];
    const payload = [titleLabel, titleUrl].join("\0");
    const generator = cloneableGenerator(setTitleSaga)(payload);

    it('should dispatch setTitleSagaStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(setTitleStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.setTitle', () => {
      const result = generator.next().value;
      result.should.to.eql(call([dashboardApi, 'setTitle'], titleLabel, titleUrl));
    });

    describe('and dashboardApi.setTitle is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises success action', () => {
        const result = clone.next().value;
        result.should.to.eql(put(setTitleFinished()));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.setTitle fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises failed action', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(setTitleFailed(error)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('setLoadingAnimationSaga', () => {
    const payload = true;
    const generator = cloneableGenerator(setLoadingAnimationSaga)(payload);

    it('should dispatch setLoadingAnimationStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(setLoadingAnimationStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.setTitle', () => {
      const result = generator.next().value;
      result.should.to.eql(call([dashboardApi, 'setLoadingAnimation'], payload));
    });

    describe('and dashboardApi.setLoadingAnimation is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises success action', () => {
        const result = clone.next().value;
        result.should.to.eql(put(setLoadingAnimationFinished()));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.setLoadingAnimation fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises failed action', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(setLoadingAnimationFailed(error)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('alertSaga', () => {
    const [message, type, timeout] = ['Hello world!', 'info', 3000]
    const payload = [message, type, timeout].join("\0");
    const generator = cloneableGenerator(setLoadingAnimationSaga)(payload);

    it('should dispatch alertStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(alertStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.setTitle', () => {
      const result = generator.next().value;
      result.should.to.eql(call([dashboardApi, 'alert'], message, type, timeout));
    });

    describe('and dashboardApi.alert is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises success action', () => {
        const result = clone.next().value;
        result.should.to.eql(put(alertFinished()));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.alert fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('raises failed action', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(alertFailed(error)));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });
});
