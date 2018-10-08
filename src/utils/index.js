import {UnitsFormats} from '@constants';

export function getUnitsTitle(format) {
  return ({
    [UnitsFormats.METRIC]: 'Metric',
    [UnitsFormats.IMPERIAL]: 'Imperial',
    [UnitsFormats.STANDARD]: 'Standard',
  })[format];
}

export function getTemperatureUnits(format) {
  return ({
    [UnitsFormats.METRIC]: 'C',
    [UnitsFormats.IMPERIAL]: 'F',
    [UnitsFormats.STANDARD]: 'K',
  })[format];
}

export function getWindUnits(format) {
  return ({
    [UnitsFormats.METRIC]: 'meter/sec',
    [UnitsFormats.IMPERIAL]: 'miles/hour',
    [UnitsFormats.STANDARD]: 'meter/sec',
  })[format];
}
