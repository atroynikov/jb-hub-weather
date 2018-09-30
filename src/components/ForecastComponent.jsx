import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WeatherIcons from "react-weathericons";

import styles from './ForecastComponent.css';

const ForecastComponent = (
  {
    forecast,
    config
  }
) => (
  <div className={styles.forecast}>
    {forecast && forecast.slice(0, config.forecastDays).map((item, idx) => (
      <div key={idx} className={styles.day} title={item.weather[0].description}>
        <h3>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(new Date(item.dt * 1e3).getDay())]}</h3>
        <p>
          <WeatherIcons name={'owm-' + item.weather[0].id}/>
        </p>
      </div>
    ))}
  </div>
);

ForecastComponent.propTypes = {
  forecast: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};

export default ForecastComponent;
