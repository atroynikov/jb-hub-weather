import 'babel-polyfill';
import {cloneableGenerator} from 'redux-saga/utils';
import {put, call, getContext} from 'redux-saga/effects';
import {
    fetchConfigurationSaga
} from '@sagas/DashboardApiSagas';
import {
    requestFetchConfiguration
} from '@actions/DashboardApiActions';

describe('DashboardApiSagas', () => {
    describe('fetchConfigurationSaga', () => {
        const gen = fetchConfigurationSaga();

        it('Test', () => {

            (generator.next().value).should.deep.equal(put(requestFetchConfiguration()));
            (generator.next().value).should.deep.equal(getContext('dashboardApi'));
        });
    });
});
