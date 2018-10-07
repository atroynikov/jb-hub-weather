import 'babel-polyfill';
import {cloneableGenerator} from 'redux-saga/utils';
import {put, call} from 'redux-saga/effects';
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock'
import {fetchIpGeolocationSaga} from '@sagas/GeolocationSagas';
import {
  requestIpGeolocation, receiveIpGeolocation, requestIpGeolocationFailed
} from '@actions/GeolocationActions';

describe('GeolocationSagas', () => {
  const ipApiUrl = 'https://ipapi.co/json/';
  const ipApiResponse = {
    "ip": "78.37.184.123",
    "city": "St Petersburg",
    "region": "St.-Petersburg",
    "region_code": "SPE",
    "country": "RU",
    "country_name": "Russia",
    "continent_code": "EU",
    "in_eu": false,
    "postal": "190880",
    "latitude": 59.8944,
    "longitude": 30.2642,
    "timezone": "Europe/Moscow",
    "utc_offset": "+0300",
    "country_calling_code": "+7",
    "currency": "RUB",
    "languages": "ru,tt,xal,cau,ady,kv,ce,tyv,cv,udm,tut,mns,bua,myv,mdf,chm,ba,inh,tut,kbd,krc,av,sah,nog",
    "asn": "AS8997",
    "org": "Rostelecom"
  };
  const error = new Error("404 Not Found");

  describe('fetchIpGeolocationSaga', () => {
    const generator = cloneableGenerator(fetchIpGeolocationSaga)();

    before(() => {
      fetchMock.mock('*', ipApiResponse);
    });

    it('should dispatch requestIpGeolocation action', () => {
      const result = generator.next().value;
      result.should.to.eql(put(requestIpGeolocation()));
    });

    it('should call ipapi request', () => {
      const result = generator.next().value;
      result.should.to.eql(call(() => fetch(ipApiUrl).then(res => res.json())));
    });

    describe('and request is successfull', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should receiveIpGeolocation action with response', () => {
        const result = generator.next(ipApiResponse).value;
        result.should.to.eql(put(receiveIpGeolocation(ipApiResponse)));
      });

      it('should complete', () => {
        const result = generator.next().done;
        result.should.to.equal(true);
      });
    });

    describe('and request is failed', () => {
      let clone;

      before(() => {
        clone = generator.clone();
      });

      it('should requestIpGeolocationFailed action with error message', () => {
        const result = clone.throw(error).value;
        result.should.to.eql(put(requestIpGeolocationFailed(error.toString())));
      });

      it('should complete', () => {
        const result = generator.next().done;
        result.should.to.equal(true);
      });
    });
  });
});
