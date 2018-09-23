import React from 'react';
import PropTypes from 'prop-types';

import styles from './ForecastComponent.css';

const ForecastComponent = ({
    forecast,
    config
}) => (
    <pre><small>{JSON.stringify(forecast, null, 4)}</small></pre>
);

ForecastComponent.propTypes = {
    forecast: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
};

export default ForecastComponent;
