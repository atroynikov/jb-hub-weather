import 'babel-polyfill';
import {cloneableGenerator} from 'redux-saga/utils';
import {put} from 'redux-saga/effects';
import {
  fetchConfigurationSaga, storeConfigurationSaga,
  fetchCacheSaga, storeCacheSaga,
  setTitleSaga,
  setLoadingAnimationSaga,
  alertSaga
} from '@sagas/DashboardApiSagas';
import {
  requestFetchConfiguration,
  requestStoreConfiguration,
  requestFetchCache,
  requestStoreCache,
  setTitleStarted,
  setLoadingAnimationStarted,
  alertStarted
} from '@actions/DashboardApiActions';

describe('DashboardApiSagas', () => {
  describe('fetchConfigurationSaga', () => {
    const generator = cloneableGenerator(fetchConfigurationSaga);

    it('must trigger requestFetchConfiguration', () => {
      (generator.next().value).should.deep.equal(put(requestFetchConfiguration()));

    });
  });

  describe('storeConfigurationSaga', () => {
    const generator = cloneableGenerator(storeConfigurationSaga);

    it('Must trigger requestStoreConfiguration', () => {
      (generator.next().value).should.deep.equal(put(requestStoreConfiguration()));
    });
  });

  describe('fetchCacheSaga', () => {
    const generator = cloneableGenerator(fetchCacheSaga);

    it('Must trigger requestFetchCache', () => {
      (generator.next().value).should.deep.equal(put(requestFetchCache()));
    });
  });

  describe('storeCacheSaga', () => {
    const generator = cloneableGenerator(storeCacheSaga);

    it('Must trigger requestStoreCache', () => {
      (generator.next().value).should.deep.equal(put(requestStoreCache()));
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
