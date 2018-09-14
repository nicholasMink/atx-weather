import React, { Component } from 'react'
import Weather from '../../helpers/api'
import Map from '../Map/Map';
import './Data.css';

export default class Data extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       cityName : '',
       temp : '',
       currentRain : '',
       long: '',
       lat: '',
       time: ''
    }
  }
  componentDidMount() {
    Weather.fetchWeatherById().then(res => {
      console.log(res, res.name);
      let timeStamp = new Date(res.dt);
      this.setState({
        cityName: `${res.name}`,
        currentRain: res.rain['1h'],
        long: res.coord.lon,
        lat: res.coord.lat,
        time: `${timeStamp.getHours()}:${timeStamp.getMinutes()}`,
      });
    })
  }
  
  render() {
    // let city = this.state
    return (
      <div>
        <Map />
        <div className="data-wrapper">
          <h3>Current conditions in { this.state.cityName }</h3>
          <p>{ this.state.time }</p>
          <p>Location @ { this.state.lat }°N, { this.state.long * -1 }°W</p>
          <p>{ this.state.currentRain }% chance of rain</p>
        </div>
      </div>
    )
  }
}
