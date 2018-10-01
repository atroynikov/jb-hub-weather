import 'babel-polyfill';
import {cloneableGenerator} from 'redux-saga/utils';
import {put, call} from 'redux-saga/effects';
import fetchMock from 'fetch-mock';
import {fetchIpGeolocationSaga} from '@sagas/GeolocationSagas';
import {
  requestIpGeolocation, receiveIpGeolocation, requestIpGeolocationFailed
} from '@actions/GeolocationActions';
import fetch from 'isomorphic-fetch';

describe('GeolocationSagas', () => {
  describe('fetchIpGeolocationSaga', () => {
    const generator = cloneableGenerator(fetchIpGeolocationSaga)();
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


    it('should dispatch requestIpGeolocation action', () => {
      const result = generator.next().value;
      result.should.deep.equal(put(requestIpGeolocation()));
    });

    before(() => {
      fetchMock.get('https://ipapi.co/json/', ipApiResponse);
    });
    it('should call ipapi request', () => {
      const result = generator.next().value;
      result.should.deep.equal(call(() => fetch(url).then(res => res.json())));
    });

    describe('and request is successfull', () => {
      let clone;

      beforeAll(() => {
        clone = generator.clone();
      });

      it('should receiveIpGeolocation action with response', () => {
        const result = generator.next().value;
        result.should.deep.equal(put(receiveIpGeolocation(ipApiResponse)));
      });

      it('should complete', () => {
        const result = generator.next().done;
        result.should.equal(true);
      });
    });

    describe('and request is successfull', () => {
      let clone;

      beforeAll(() => {
        clone = generator.clone();
      });

      it('should receiveIpGeolocation action with response', () => {
        const error = new Error("404 Not Found");
        const result = clone.throw(error).value;
        result.should.deep.equal(put(requestIpGeolocationFailed(error)));
      });

      it('should complete', () => {
        const result = generator.next().done;
        result.should.equal(true);
      });
    });


  });
});
