import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './ForecastComponent.css';

const ForecastComponent = ({
    forecast,
    config
}) => (
    <div className={styles.forecast}>
        {forecast.list && forecast.list.map(item => (
            <div className={styles.forecastItem}>
                <span>{item.dt_txt}</span>
                " "
                <span>{item.main.temp}</span>
            </div>
        ))}
    </div>
);

ForecastComponent.propTypes = {
    forecast: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
};

export default ForecastComponent;
