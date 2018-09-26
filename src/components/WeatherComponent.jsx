import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WeatherIcons from 'react-weathericons';

import styles from './WeatherComponent.css';

const WeatherComponent = (
  {
    weather,
    config
  }
) => (
  <div className={styles.weather}>
    <div className={styles.weatherCurrent}>
      <div className={styles.weatherCurrentInfo}>
        <div>&nbsp;</div>
        <div className={styles.weatherCurrentInfoCity}>
          {weather.name || '...'}
        </div>
        <div className={styles.weatherCurrentInfoTemp}>
          {weather && weather.main ? weather.main.temp : '...'}
          {weather && weather.main && <small>&deg;{config.tempScale}</small>}
        </div>
        <div className={styles.weatherCurrentInfoCityWind}>
          {weather && weather.wind ? weather.wind.speed : '...'} m/sec
        </div>
        <div>&nbsp;</div>
      </div>
      <div className={styles.weatherCurrentIcon}>
        {weather.weather && <WeatherIcons name={'owm-' + weather.weather[0].id} size="2x"/>}
      </div>
    </div>
  </div>
);

WeatherComponent.propTypes = {
  weather: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};

export default WeatherComponent;
