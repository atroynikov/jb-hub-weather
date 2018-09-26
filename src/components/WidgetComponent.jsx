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
  <div className={styles.widget}>
    {configMode
      ? <Configuration/>
      : config
        ? <React.Fragment>
          <Weather/>
          {config.showForecast && <Forecast/>}
        </React.Fragment>
        : <LoaderScreen/>
    }
  </div>
);

WidgetComponent.propTypes = {
  config: PropTypes.object.isRequired,
  configMode: PropTypes.bool.isRequired,
  Configuration: PropTypes.func.isRequired,
  Weather: PropTypes.func.isRequired,
  Forecast: PropTypes.func.isRequired
};

export default WidgetComponent;
