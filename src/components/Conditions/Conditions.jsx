import React, { Component } from 'react';

import dbAPI from '../../controller/dbhelp';
import './Conditions.css';

export default class Conditions extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      date: `${this.timestamp}`,
      city: null,
      temp: null,
      rain: null,
      wind: null,
      windDirection: null,
      pressure: null,
      maxTemp: null,
      minTemp: null,
      clouds: null,
    }
  }

  timestamp = new Date();

  componentDidMount() {
    dbAPI.fetchConditions((error, weather) => {
      if (error) {
        console.error(error);
      } else {
        console.log(weather)
        this.setState({
          city: `${weather.name}`,
          temp: `${Math.round((parseInt(weather.main.temp, 10) - 273.15) * 1.8 + 32)}`,
          rain: `${weather.rain['1h']}%`,
          wind: `${weather.wind.speed}`,
          windDirection: `${weather.wind.deg}`,
          maxTemp: `${Math.round((parseInt(weather.main.temp_max, 10) - 273.15) * 1.8 + 32)}`,
          minTemp: `${Math.round((parseInt(weather.main.temp_min, 10) - 273.15) * 1.8 + 32)}`,
          pressure: `${weather.main.pressure}`,
          clouds: `${weather.clouds.all}`
        })
        console.log(this.state);
      }
    });
    // dbAPI.postHistoricWeather(this.state, (error, response) => {
    //   if (error) {
    //     console.log(error)
    //   }
    //   else {
    //     console.log(response);
    //   }
    // });
  }
  //298.8 kelvin === ?f
  render() {
    return (
      <section className="conditions__wrapper">
        <h4>Current Conditions</h4>
        <ul className="conditions__list">
          <li className="conditions__list__item">
            <div className="conditions__list__item_grow">
              <img src='./img/icons/rain-gradient.svg' alt='rain chance icon' />
            </div>
            <p>{ parseFloat(this.state.rain, 10) * 100 }%</p>
          </li>
          <li className="conditions__list__item">
            <div className="conditions__list__item_grow">
              <img src='./img/icons/cloud-gradient.svg' alt='cloud icon' />
            </div>
            <p>{ this.state.clouds }%</p>
          </li>
          <li className="conditions__list__item">
            <div className="conditions__list__item_grow">
              <img src='./img/icons/wind-gradient.svg' alt='windspeed icon' />
            </div>
            <p>{ this.state.wind } MPH</p>
          </li>
        </ul>
      </section>
    )
  }
}
