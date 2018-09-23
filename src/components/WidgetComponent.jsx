import React from 'react';
import PropTypes from 'prop-types';

import LoaderScreen from '@jetbrains/ring-ui/components/loader-screen/loader-screen';
import styles from './WidgetComponent.css';

const WidgetComponent = ({
    config,
    configMode,
    Configuration,
    Weather,
    Forecast
}) => (
    <div>
        {configMode
        ? <Configuration/>
        :   config.data
            ? <React.Fragment><Weather/><Forecast/></React.Fragment>
            : <LoaderScreen/>
        }
    </div>
);

WidgetComponent.propTypes = {
    config: PropTypes.object.isRequired,
    configMode: PropTypes.bool.isRequired,
    Configuration: PropTypes.element.isRequired,
    Weather: PropTypes.element.isRequired,
    Forecast: PropTypes.element.isRequired
};

export default WidgetComponent;
