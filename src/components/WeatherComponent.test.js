import React from 'react';
import {mount} from 'enzyme';

import {WeatherComponent} from '@components';
import styles from '@components/WeatherComponent.css';

describe('WeatherComponent', () => {
  const props = {
    weather: {
      "coord": {
        "lon": 30.26,
          "lat": 59.89
      },
      "weather": [
        {
          "id": 520,
          "main": "Rain",
          "description": "light intensity shower rain",
          "icon": "09n"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 5,
        "pressure": 1010,
        "humidity": 86,
        "temp_min": 5,
        "temp_max": 5
      },
      "visibility": 10000,
        "wind": {
        "speed": 4,
          "deg": 20
      },
      "clouds": {
        "all": 90
      },
      "dt": 1538929800,
        "sys": {
        "type": 1,
          "id": 7267,
          "message": 0.0039,
          "country": "RU",
          "sunrise": 1538885991,
          "sunset": 1538925130
      },
      "id": 498817,
        "name": "Saint Petersburg",
        "cod": 200
    },
    config: {

    }
  };
  const mountWeather = props => mount(<WeatherComponent {...props}/>);

  it('should render', () => {
    mountWeather(props).should.have.type(WeatherComponent);
  });
});
