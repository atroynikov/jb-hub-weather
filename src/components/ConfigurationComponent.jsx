import React from 'react';

import {Grid, Row, Col} from '@jetbrains/ring-ui/components/grid/grid';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';
import Input from '@jetbrains/ring-ui/components/input/input';
import Radio from '@jetbrains/ring-ui/components/radio/radio';
import RadioItem from '@jetbrains/ring-ui/components/radio/radio__item';
import Checkbox from '@jetbrains/ring-ui/components/checkbox/checkbox';

import '@jetbrains/ring-ui/components/form/form.scss';

const ConfigurationComponent = ({
    tempScale, setTempScale,
    locSource, setLocSource,
    showForecast, setShowForecast,
    forecastDays, setForecastDays,
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
                            <Input/>
                        </div>
                    </div>
                    }
                    {locSource === 'coord' &&
                    <div className="ring-form__group">
                        <div className="ring-form__label">Place coordinates</div>
                        <div className="ring-form__control">
                            <Input/>
                        </div>
                    </div>
                    }
                    <div className="ring-form__group">
                        <div className="ring-form__label">Scale</div>
                        <div className="ring-form__control">
                            <Radio value={tempScale} onChange={setTempScale}>
                                <RadioItem value="C">Celsius (&deg;C)</RadioItem>
                                <RadioItem value="F">Farenheit (&deg;F)</RadioItem>
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
                            <Input value={forecastDays} onChange={setShowForecast}/>
                        </div>
                    </div>
                    }
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
                            <Input value={owmAppId} onChange={ev => setOwmAppId(ev.target.value)}/>
                        </div>
                    </div>
                    }
                    {dataSource === 'ds' &&
                    <div className="ring-form__group">
                        <div className="ring-form__label">Dark Sky secret key</div>
                        <div className="ring-form__control">
                            <Input value={dsSecretKey} onChange={ev => setDsSecretKey(ev.target.value)}/>
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

export default ConfigurationComponent;
