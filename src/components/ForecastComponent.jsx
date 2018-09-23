import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WeatherIcons from "react-weathericons";

import styles from './ForecastComponent.css';

const ForecastComponent = ({
    forecast,
    config
}) => (
    <div className={styles.forecast}>
        {forecast.list && forecast.list.slice(0, 3).map(item => (
            <div className={styles.day}>
                <h3>Mon</h3>
                <p>
                    <WeatherIcons name={'owm-'+ item.weather[0].id}/>
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
