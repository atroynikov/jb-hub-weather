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

import '@jetbrains/ring-ui/components/form/form.scss';

const ConfigurationComponent = ({
    tempScale, setTempScale,
    placeName, setPlaceName,
    locSource, setLocSource,
    showForecast, setShowForecast,
    forecastDays, setForecastDays,
    updateInt, setUpdateInt,
    dataSource, setDataSource,
    owmAppId, setOwmAppId,
    dsSecretKey, setDsSecretKey,
    onSave, onCancel
}) => (
     <Grid>
         <Row>
            <Col xs={12}>
                <form className="ring-form">
                    <div className="ring-form__group">
                        <div className="ring-form__label">Location source</div>
                        <div className="ring-form__control">
                            <Radio value={locSource} onChange={setLocSource}>
                                <RadioItem value="geo">Geolocation</RadioItem>
                                <RadioItem value="name">Place name</RadioItem>
                                <RadioItem value="coord">Place coordinates</RadioItem>
                            </Radio>
                        </div>
                    </div>
                    {locSource === 'name' &&
                    <div className="ring-form__group">
                        <div className="ring-form__label">Place name</div>
                        <div className="ring-form__control">
                            <Input size={Size.FULL} value={placeName} onChange={ev => setPlaceName(ev.target.value)}/>
                        </div>
                    </div>
                    }
                    {locSource === 'coord' &&
                    <div className="ring-form__group">
                        <div className="ring-form__label">Place coordinates</div>
                        <div className="ring-form__control">
                            <Input size={Size.FULL}/>
                        </div>
                    </div>
                    }
                    <div className="ring-form__group">
                        <div className="ring-form__label">Scale</div>
                        <div className="ring-form__control">
                            <Radio value={tempScale} onChange={setTempScale}>
                                <RadioItem value="C">Celsius (&deg;C)</RadioItem>
                                <RadioItem value="F">Farenheit (&deg;F)</RadioItem>
                                <RadioItem value="K">Kelvin (&deg;K)</RadioItem>
                            </Radio>
                        </div>
                    </div>
                    <div className="ring-form__group">
                        <div className="ring-form__label">Show forecast</div>
                        <div className="ring-form__control">
                            <Checkbox checked={showForecast} onChange={ev => setShowForecast(ev.target.checked)}/>
                        </div>
                    </div>
                    {showForecast &&
                    <div className="ring-form__group">
                        <div className="ring-form__label">Forecast days</div>
                        <div className="ring-form__control">
                            <Input value={''+forecastDays} onChange={ev => setForecastDays(ev.target.value)}/>
                        </div>
                    </div>
                    }
                    <div className="ring-form__group">
                        <div className="ring-form__label">Update interval (sec)</div>
                        <div className="ring-form__control">
                            <Input value={''+updateInt} onChange={ev => setUpdateInt(ev.target.value)}/>
                        </div>
                    </div>
                    <div className="ring-form__group">
                        <div className="ring-form__label">Data source</div>
                        <div className="ring-form__control">
                            <Radio value={dataSource} onChange={setDataSource}>
                                <RadioItem value="owm">OpenWeatherMap</RadioItem>
                                <RadioItem value="ds">Dark Sky</RadioItem>
                            </Radio>
                        </div>
                    </div>
                    {dataSource === 'owm' &&
                    <div className="ring-form__group">
                        <div className="ring-form__label">OWM APP ID</div>
                        <div className="ring-form__control">
                            <Input
                                size={Size.FULL}
                                value={owmAppId}
                                onChange={ev => setOwmAppId(ev.target.value)}
                                onClear={ev => setOwmAppId('')}
                            />
                        </div>
                    </div>
                    }
                    {dataSource === 'ds' &&
                    <div className="ring-form__group">
                        <div className="ring-form__label">Dark Sky secret key</div>
                        <div className="ring-form__control">
                            <Input
                                size={Size.FULL}
                                value={dsSecretKey}
                                onChange={ev => setDsSecretKey(ev.target.value)}
                                onClear={ev => setDsSecretKey('')}
                            />
                        </div>
                    </div>
                    }
                    <div className="ring-form__footer">
                        <Panel>
                            <Button primary onClick={() => onSave()}>Save</Button>
                            <Button onClick={() => onCancel()}>Cancel</Button>
                        </Panel>
                    </div>
                </form>
            </Col>
         </Row>
    </Grid>
);

ConfigurationComponent.propTypes = {
    tempScale: PropTypes.string.isRequired,
    setTempScale: PropTypes.func.isRequired,
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
