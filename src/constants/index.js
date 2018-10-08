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

export const UnitsFormats = Object.freeze({
  STANDARD: 'standard',
  METRIC: 'metric',
  IMPERIAL: 'imperial'
});

export const WIDGET_TITLE = 'JetBrains Hub weather widget';
export const WIDGET_TITLE_CONFIG = 'JetBrains Hub weather widget configuration';

export const ApiKeys = Object.freeze({
  OPEN_WEATHER_MAP: '757dd97f4bcba5a5328ebb5395a61384',
  DARK_SKY: 'c538faa3d9d27354adfbab12e2abd0c1',
});

export const ApiBaseURL = Object.freeze({
  OPEN_WEATHER_MAP: 'https://api.openweathermap.org/data/2.5',
  DARK_SKY: 'https://api.darksky.net/forecast',
});
