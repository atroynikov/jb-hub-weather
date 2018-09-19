import React from 'react';

import {Grid, Row, Col} from '@jetbrains/ring-ui/components/grid/grid';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';
import Input from '@jetbrains/ring-ui/components/input/input';
import Radio from '@jetbrains/ring-ui/components/radio/radio';
import RadioItem from '@jetbrains/ring-ui/components/radio/radio__item';

import '@jetbrains/ring-ui/components/form/form.scss';
import '@jetbrains/ring-ui/components/panel/panel.scss';
import '@jetbrains/ring-ui/components/button/button.scss';
import '@jetbrains/ring-ui/components/input/input.scss';
import '@jetbrains/ring-ui/components/input-size/input-size.scss';

const ConfigurationComponent = ({
    scale,
    setScale,
    source,
    setSource,
    onSave,
    onCancel
}) => (
     <Grid>
         <Row>
            <Col xs={12}>
                <form className="ring-form">
                    <span className="ring-form__title">Widget configuration</span>
                    <div className="ring-form__group">
                        <div className="ring-form__label">Location source</div>
                        <div className="ring-form__control">
                            <Radio onChange={setSource}>
                                <RadioItem value="geo" defaultChecked>Geolocation</RadioItem>
                                <RadioItem value="name">Place name</RadioItem>
                                <RadioItem value="coord">Place coordinates</RadioItem>
                            </Radio>
                        </div>
                    </div>
                    {source === 'name' &&
                    <div className="ring-form__group">
                        <div className="ring-form__label">Place name</div>
                        <div className="ring-form__control">
                            <Input/>
                        </div>
                    </div>
                    }
                    {source === 'coord' &&
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
                            <Radio onChange={setScale}>
                                <RadioItem value="C" defaultChecked>Celsius</RadioItem>
                                <RadioItem value="F">Farenheit</RadioItem>
                            </Radio>
                        </div>
                    </div>
                    <div className="ring-form__group">
                        <div className="ring-form__label">Forecast days</div>
                        <div className="ring-form__control">

                        </div>
                    </div>
                    <div className="ring-form__group">
                        <div className="ring-form__label">Data source</div>
                        <div className="ring-form__control">
                            <Radio>
                                <RadioItem value="OpenWeatherMap" defaultChecked>OpenWeatherMap</RadioItem>
                                <RadioItem value="DarkSky">DarkSky</RadioItem>
                            </Radio>
                        </div>
                    </div>
                    <div className="ring-form__group">
                        <div className="ring-form__label">OpenWeatherMap key</div>
                        <div className="ring-form__control">
                            <Input/>
                        </div>
                    </div>
                    <div className="ring-form__footer">
                        <Panel>
                            <Button blue={true} onClick={() => onSave()}>Save</Button>
                            <Button blue={false} onClick={() => onCancel()}>Cancel</Button>
                        </Panel>
                    </div>
                </form>
            </Col>
         </Row>
    </Grid>
);

export default ConfigurationComponent;
