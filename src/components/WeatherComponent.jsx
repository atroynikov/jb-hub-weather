import React from 'react';
import PropTypes from 'prop-types';

import styles from './WeatherComponent.css';

const WeatherComponent = ({
    weather,
    config
}) => (
    <div className={styles.weather}>
        <div className={styles.weatherCurrent}>
            <div className={styles.weatherCurrentInfo}>
                <div>&nbsp;</div>
                <div className={styles.weatherCurrentInfoCity}>
                    <small>
                        <small>CITY:</small>
                    </small>
                    {weather.name || '?'}
                </div>
                <div className={styles.weatherCurrentInfoTemp}>
                    {weather && weather.main ? weather.main.temp : '?'}&deg;
                    <small>{config.tempScale}</small>
                </div>
                <div className={styles.weatherCurrentInfoCityWind}>
                    <small>
                        <small>WIND:</small>
                    </small>
                    {weather && weather.wind ? weather.wind.speed : '?'} km/h
                </div>
                <div>&nbsp;</div>
            </div>
            <div className={styles.weatherCurrentIcon}>
                <span className="wi-day-sunny"/>
            </div>
        </div>
    </div>
);

WeatherComponent.propTypes = {

};

export default WeatherComponent;