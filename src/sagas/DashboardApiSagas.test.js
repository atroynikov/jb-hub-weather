import 'babel-polyfill';
import {cloneableGenerator} from 'redux-saga/utils';
import {put} from 'redux-saga/effects';
import {
  readConfigSaga, storeConfigSaga,
  readCacheSaga, storeCacheSaga,
  setTitleSaga,
  setLoadingAnimationSaga,
  alertSaga
} from '@sagas/DashboardApiSagas';
import {
  readConfigStarted,
  storeConfigStarted,
  readCacheStarted,
  storeCacheStarted,
  setTitleStarted,
  setLoadingAnimationStarted,
  alertStarted
} from '@actions/DashboardApiActions';

describe('DashboardApiSagas', () => {
  describe('readConfigSaga', () => {
    const generator = cloneableGenerator(readConfigSaga);

    it('must trigger readConfigStarted', () => {
      (generator.next().value).should.deep.equal(put(readConfigStarted()));

    });
  });

  describe('storeConfigSaga', () => {
    const generator = cloneableGenerator(storeConfigSaga);

    it('Must trigger storeConfigStarted', () => {
      (generator.next().value).should.deep.equal(put(storeConfigStarted()));
    });
  });

  describe('readCacheSaga', () => {
    const generator = cloneableGenerator(readCacheSaga);

    it('Must trigger readCacheStarted', () => {
      (generator.next().value).should.deep.equal(put(readCacheStarted()));
    });
  });

  describe('storeCacheSaga', () => {
    const generator = cloneableGenerator(storeCacheSaga);

    it('Must trigger storeCacheStarted', () => {
      (generator.next().value).should.deep.equal(put(storeCacheStarted()));
    });
  });

  describe('setTitleSaga', () => {
    const generator = cloneableGenerator(setTitleSaga);

    it('Must trigger setTitleStarted', () => {
      (generator.next().value).should.deep.equal(put(setTitleStarted()));
    });
  });

  describe('setLoadingAnimationSaga', () => {
    const generator = cloneableGenerator(setLoadingAnimationSaga);

    it('Must trigger setLoadingAnimationStarted', () => {
      (generator.next().value).should.deep.equal(put(setLoadingAnimationStarted()));
    });
  });

  describe('alertSaga', () => {
    const generator = cloneableGenerator(alertSaga);

    it('Must trigger alertStarted', () => {
      (generator.next().value).should.deep.equal(put(alertStarted()));
    });
  });
});
