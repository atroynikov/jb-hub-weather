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
    setLoadingAnimationEnabled: () => {},
    alert: () => {},
  };
  const error = new Error("Type error: error description");

  before(() => {
    sinon.stub(dashboardApi, 'readConfig').resolves(config);
    sinon.stub(dashboardApi, 'storeConfig').resolves();
    sinon.stub(dashboardApi, 'readCache').resolves(cache);
    sinon.stub(dashboardApi, 'storeCache').resolves();
    sinon.stub(dashboardApi, 'setTitle').resolves();
    sinon.stub(dashboardApi, 'setLoadingAnimationEnabled').resolves();
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
      const result = generator.next(dashboardApi).value;
      result.should.to.eql(call([dashboardApi, 'readConfig']));
    });

    describe('and dashboardApi.readConfig is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch readConfigFinished', () => {
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

      it('should dispatch readConfigFailed', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(readConfigFailed(error.toString())));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('storeConfigSaga', () => {
    const generator = cloneableGenerator(storeConfigSaga)({payload: config});

    it('should dispatch storeConfigStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(storeConfigStarted(config)));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.storeConfig', () => {
      const result = generator.next(dashboardApi).value;
      result.should.to.eql(call([dashboardApi, 'storeConfig'], config));
    });

    describe('and dashboardApi.storeConfig is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch storeConfigFinished', () => {
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

      it('should dispatch storeConfigFailed', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(storeConfigFailed(error.toString())));
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
      const result = generator.next(dashboardApi).value;
      result.should.to.eql(call([dashboardApi, 'readCache']));
    });

    describe('and dashboardApi.readCache is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch readCacheFinished', () => {
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

      it('should dispatch readCacheFailed', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(readCacheFailed(error.toString())));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('storeCacheSaga', () => {
    const generator = cloneableGenerator(storeCacheSaga)({payload: cache});

    it('should dispatch storeCacheStarted', () => {
      const result = generator.next(cache).value;
      result.should.to.eql(put(storeCacheStarted(cache)));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.storeCache', () => {
      const result = generator.next(dashboardApi).value;
      result.should.to.eql(call([dashboardApi, 'storeCache'], cache));
    });

    describe('and dashboardApi.storeCache is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch storeCacheFinished', () => {
        const result = clone.next(cache).value;
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

      it('should dispatch storeCacheFailed', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(storeCacheFailed(error.toString())));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('setTitleSaga', () => {
    const [label, labelUrl] = ['JetBrains', 'https://jetbrains.com/'];
    const payload = [label, labelUrl].join("\0");
    const generator = cloneableGenerator(setTitleSaga)({payload});

    it('should dispatch setTitleSagaStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(setTitleStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.setTitle', () => {
      const result = generator.next(dashboardApi).value;
      result.should.to.eql(call([dashboardApi, 'setTitle'], label, labelUrl));
    });

    describe('and dashboardApi.setTitle is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch setTitleFinished', () => {
        const result = clone.next().value;
        result.should.to.eql(put(setTitleFinished(label, labelUrl)));
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

      it('should dispatch setTitleFailed', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(setTitleFailed(error.toString())));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('setLoadingAnimationSaga', () => {
    const payload = true;
    const generator = cloneableGenerator(setLoadingAnimationSaga)({payload});

    it('should dispatch setLoadingAnimationStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(setLoadingAnimationStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.setLoadingAnimationEnabled', () => {
      const result = generator.next(dashboardApi).value;
      result.should.to.eql(call([dashboardApi, 'setLoadingAnimationEnabled'], payload));
    });

    describe('and dashboardApi.setLoadingAnimationEnabled is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch setLoadingAnimationFinished', () => {
        const result = clone.next().value;
        result.should.to.eql(put(setLoadingAnimationFinished()));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and dashboardApi.setLoadingAnimationEnabled fails', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch setLoadingAnimationFailed', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(setLoadingAnimationFailed(error.toString())));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });

  describe('alertSaga', () => {
    const [message, type, timeout] = ['Hello world!', 'info', 3000];
    const payload = [message, type, timeout].join("\0");
    const generator = cloneableGenerator(alertSaga)({payload});

    it('should dispatch alertStarted', () => {
      const result = generator.next().value;
      result.should.to.eql(put(alertStarted()));
    });

    it('should get dashboardApi from context', () => {
      const result = generator.next().value;
      result.should.to.eql(getContext('dashboardApi'));
    });

    it('should call dashboardApi.alert', () => {
      const result = generator.next(dashboardApi).value;
      result.should.to.eql(call([dashboardApi, 'alert'], message, type, timeout));
    });

    describe('and dashboardApi.alert is successful', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should dispatch alertFinished', () => {
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

      it('should dispatch alertFailed', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(alertFailed(error.toString())));
      });

      it('performs no further work', () => {
        const result = clone.next().done;
        result.should.to.equal(true);
      });
    });
  });
});
