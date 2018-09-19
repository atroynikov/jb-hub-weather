import React from 'react';

import styles from './ForecastComponent.css';

const ForecastComponent = ({
    forecast
}) => (
    <pre>{JSON.stringify(forecast, null, 4)}</pre>
);

export default ForecastComponent;