import React from 'react';
import PropTypes from 'prop-types';

import styles from './WeatherComponent.css';

const WeatherComponent = ({
    weather
}) => (
    <div className={styles.weather}>
        <div className={styles.weatherCurrent}>
            <div className={styles.weatherCurrentInfo}>
                {/*<pre>{JSON.stringify(weather, null, 4)}</pre>*/}
                <div>&nbsp;</div>
                <div className={styles.weatherCurrentInfoCity}>
                    <small>
                        <small>CITY:</small>
                    </small>
                    {weather.name || '?'}
                </div>
                <div className={styles.weatherCurrentInfoTemp}>
                    {weather && weather.main ? weather.main.temp : '?'}&deg;
                    <small>C</small>
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