import React from 'react';
import PropTypes from 'prop-types';

import Loader from '@jetbrains/ring-ui/components/loader/loader';
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

// WidgetComponent.propTypes = {
//     isConfiguring: PropTypes.bool.isRequired,
//     Configuration: PropTypes.func.isRequired,
//     Weather: PropTypes.func.isRequired,
//     Forecast: PropTypes.func.isRequired
// };

export default WidgetComponent;