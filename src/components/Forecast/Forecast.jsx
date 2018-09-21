import React, { Component } from 'react';

import dbAPI from '../../controller/dbhelp';
import './Forecast.css';

export default class Forecast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: `${this.timestamp}`,
      day1: [{
        lastTempMax: null,
        lastTempMin: null,
        rain: null,
        description: null,
      }],
      day2: [{
        date: null,
        lastTempMax: null,
        lastTempMin: null,
        rain: null,
        description: null,
      }],
      day3: [{
        date: null,
        lastTempMax: null,
        lastTempMin: null,
        rain: null,
        description: null,
      }],
    }
  }

  timestamp = new Date();

  componentDidMount() {
    dbAPI.fetchThreeDay((error, forecast) => {
      if (error) {
        console.error(error);
      } else {
        console.log(forecast)
        forecast.forEach(threeHourData => {
          let futureTime = new Date(threeHourData.dt_txt);
          console.log(threeHourData, futureTime.getDate());
          let day1date = futureTime.getDate();
          let todayDate = new Date();
          todayDate = todayDate.getDate();
          console.log(todayDate)
          if (day1date === todayDate) {
            this.setState({
              day1: [{
                lastTempMax: `${Math.round((parseInt(threeHourData.main.temp_max, 10) - 273.15) * 1.8 + 32)}`,
                lastTempMin: `${Math.round((parseInt(threeHourData.main.temp_min, 10) - 273.15) * 1.8 + 32)}`,
                description: `${threeHourData.weather[0].description}`,
              }]
            })
            day1date++;
          } else if (day1date === todayDate + 1) {
            this.setState({
              day2: [{
                date: `${futureTime.getMonth()}/${todayDate + 1}`,
                lastTempMax: `${Math.round((parseInt(threeHourData.main.temp_max, 10) - 273.15) * 1.8 + 32)}`,
                lastTempMin: `${Math.round((parseInt(threeHourData.main.temp_min, 10) - 273.15) * 1.8 + 32)}`,
                description: `${threeHourData.weather[0].description}`,
              }]
            })
            day1date++;
          } else if (day1date === todayDate + 2) {
            this.setState({
              day3: [{
                date: `${futureTime.getMonth()}/${todayDate + 2}`,
                lastTempMax: `${Math.round((parseInt(threeHourData.main.temp_max, 10) - 273.15) * 1.8 + 32)}`,
                lastTempMin: `${Math.round((parseInt(threeHourData.main.temp_min, 10) - 273.15) * 1.8 + 32)}`,
                description: `${threeHourData.weather[0].description}`,
              }]
            })
          }
        })
      }
    });
  }
  render() {
    return (
      <section className="forecast__wrapper">
        <h4>3 Day Forecast</h4><hr />
        <ul>
          <li>
            <h5>Today</h5>
            <p className="forecast__description">{ this.state.day1[0].description }</p>
            <p>H { this.state.day1[0].lastTempMax }° F</p>
            <p>L { this.state.day1[0].lastTempMin }° F</p>
          </li>
          <li>
            <h5>{ this.state.day2[0].date }</h5>
            <p className="forecast__description">{ this.state.day2[0].description }</p>
            <p>H { this.state.day2[0].lastTempMax }° F</p>
            <p>L { this.state.day2[0].lastTempMin }° F</p>
          </li>
          <li>
            <h5>{ this.state.day3[0].date }</h5>
            <p className="forecast__description">{ this.state.day3[0].description }</p>
            <p>H { this.state.day3[0].lastTempMax }° F</p>
            <p>L { this.state.day3[0].lastTempMin }° F</p>
          </li>
        </ul>
      </section>
    )
  }
}
