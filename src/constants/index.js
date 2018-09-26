export const ActionStates = Object.freeze({
  IDLED: 'IDLED',
  CALLED: 'CALLED',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
  FAILED: 'FAILED'
});

export const LocationSources = Object.freeze({
  GEO: 'geo',
  NAME: 'name',
  COORD: 'coord'
});

export const DataSources = Object.freeze({
  OPEN_WEATHER_MAP: 'owm',
  DARK_SKY: 'ds',
  APIXU: 'apixu'
});
