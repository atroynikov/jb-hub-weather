import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Grid, Row, Col} from '@jetbrains/ring-ui/components/grid/grid';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';
import Input, {Size, Theme} from '@jetbrains/ring-ui/components/input/input';
import Radio from '@jetbrains/ring-ui/components/radio/radio';
import RadioItem from '@jetbrains/ring-ui/components/radio/radio__item';
import Checkbox from '@jetbrains/ring-ui/components/checkbox/checkbox';

import {LocationSources, DataSources, UnitsFormats} from '@constants';
import * as Utils from '@utils';

import '@jetbrains/ring-ui/components/form/form.scss';

export const LocationSource = ({locSource, setLocSource}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">Location source</div>
    <div className="ring-form__control">
      <Radio value={locSource} onChange={(value) => setLocSource(value)}>
        <RadioItem value={LocationSources.GEO}>Geolocation</RadioItem>
        <RadioItem value={LocationSources.NAME}>Place name</RadioItem>
        <RadioItem value={LocationSources.COORD}>Place coordinates</RadioItem>
      </Radio>
    </div>
  </div>
);

export const PlaceName = ({placeName, setPlaceName}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">Place name</div>
    <div className="ring-form__control">
      <Input size={Size.FULL} value={placeName} onChange={ev => setPlaceName(ev.target.value)} borderless/>
    </div>
  </div>
);

export const PlaceCoordinates = ({}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">Place coordinates</div>
    <div className="ring-form__control">
      <Input size={Size.FULL}/>
    </div>
  </div>
);

export const UnitsFormat = ({unitsFormat, setUnitsFormat}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">Units format</div>
    <div className="ring-form__control">
      <Radio value={unitsFormat} onChange={(value) => setUnitsFormat(value)}>
        {[UnitsFormats.METRIC, UnitsFormats.STANDARD, UnitsFormats.IMPERIAL].map(
          format => (
            <RadioItem value={format}>
              {Utils.getUnitsTitle(format)} (&deg;{Utils.getTemperatureUnits(format)}, {Utils.getWindUnits(format)})
            </RadioItem>
          )
        )}
      </Radio>
    </div>
  </div>
);

export const ShowForecast = ({showForecast, setShowForecast}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">Show forecast</div>
    <div className="ring-form__control">
      <Checkbox checked={showForecast} onChange={ev => setShowForecast(ev.target.checked)}/>
    </div>
  </div>
);

export const ForecastDays = ({forecastDays, setForecastDays}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">Forecast days</div>
    <div className="ring-form__control">
      <Input value={'' + forecastDays} onChange={ev => setForecastDays(ev.target.value)}/>
    </div>
  </div>
);

export const UpdateInterval = ({updateInt, setUpdateInt}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">Update interval (sec)</div>
    <div className="ring-form__control">
      <Input value={'' + updateInt} onChange={ev => setUpdateInt(ev.target.value)}/>
    </div>
  </div>
);

export const DataSource = ({dataSource, setDataSource}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">Data source</div>
    <div className="ring-form__control">
      <Radio value={dataSource} onChange={setDataSource}>
        <RadioItem value={DataSources.OPEN_WEATHER_MAP}>OpenWeatherMap</RadioItem>
        <RadioItem value={DataSources.DARK_SKY}>Dark Sky</RadioItem>
        <RadioItem value={DataSources.APIXU} disabled>Apixu</RadioItem>
      </Radio>
    </div>
  </div>
);

export const OwmAppId = ({owmAppId, setOwmAppId}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">OWM APP ID</div>
    <div className="ring-form__control">
      <Input
        size={Size.FULL}
        value={owmAppId}
        onChange={ev => setOwmAppId(ev.target.value)}
        onClear={() => setOwmAppId('')}
      />
    </div>
  </div>
);

export const DsSecretKey = ({dsSecretKey, setDsSecretKey}) => (
  <div className="ring-form__group">
    <div className="ring-form__label">Dark Sky secret key</div>
    <div className="ring-form__control">
      <Input
        size={Size.FULL}
        value={dsSecretKey}
        onChange={ev => setDsSecretKey(ev.target.value)}
        onClear={() => setDsSecretKey('')}
      />
    </div>
  </div>
);

const ConfigurationComponent = (props) => {
  console.log(props);
  return (
  <Grid>
    <Row>
      <Col xs={12}>
        <form className="ring-form">
          <LocationSource {...props}/>
          {props.locSource === LocationSources.NAME && <PlaceName {...props}/>}
          {props.locSource === LocationSources.COORD && <PlaceCoordinates {...props}/>}
          <UnitsFormat {...props}/>
          <ShowForecast {...props}/>
          {props.showForecast && <ForecastDays {...props}/>}
          <UpdateInterval {...props}/>
          <DataSource {...props}/>
          {props.dataSource === DataSources.OPEN_WEATHER_MAP && <OwmAppId {...props}/>}
          {props.dataSource === DataSources.DARK_SKY && <DsSecretKey {...props}/>}
          <div className="ring-form__footer">
            <Panel>
              <Button primary onClick={() => props.onSave()}>Save</Button>
              <Button onClick={() => props.onCancel()}>Cancel</Button>
            </Panel>
          </div>
        </form>
      </Col>
    </Row>
  </Grid>
)};

ConfigurationComponent.propTypes = {
  UnitsFormat: PropTypes.string.isRequired,
  setUnitsFormat: PropTypes.func.isRequired,
  placeName: PropTypes.string.isRequired,
  setPlaceName: PropTypes.func.isRequired,
  locSource: PropTypes.string.isRequired,
  setLocSource: PropTypes.func.isRequired,
  showForecast: PropTypes.bool.isRequired,
  setShowForecast: PropTypes.func.isRequired,
  forecastDays: PropTypes.number.isRequired,
  setForecastDays: PropTypes.func.isRequired,
  updateInt: PropTypes.number.isRequired,
  setUpdateInt: PropTypes.func.isRequired,
  dataSource: PropTypes.string.isRequired,
  setDataSource: PropTypes.func.isRequired,
  owmAppId: PropTypes.string.isRequired,
  setOwmAppId: PropTypes.func.isRequired,
  dsSecretKey: PropTypes.string.isRequired,
  setDsSecretKey: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ConfigurationComponent;
