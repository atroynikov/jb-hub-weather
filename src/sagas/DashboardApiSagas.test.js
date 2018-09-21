import 'babel-polyfill';
import {put, call, getContext} from 'redux-saga/effects';
import {
    fetchConfigurationSaga
} from '@sagas/DashboardApiSagas';
import {
    requestFetchConfiguration
} from '@actions/DashboardApiActions';

describe('DashboardApiSagas', () => {
    describe('fetchConfigurationSaga', () => {
        it('Test', () => {
            const generator = fetchConfigurationSaga();

            (generator.next().value).should.deep.equal(put(requestFetchConfiguration()));
            (generator.next().value).should.deep.equal(getContext('dashboardApi'));
        });
    });
});