import React, { Component } from 'react';

import './Header.css';
import dbAPI from '../../controller/dbhelp';

export default class Header extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       currentTemp: null,
       currentCondition: null,
    }
  }

  componentDidMount() {
    dbAPI.fetchConditions((error, weather) => {
      if (error) {
        console.error(error);
      } else {
        console.log(weather)
        this.setState({
          currentTemp: `${Math.round((parseInt(weather.main.temp, 10) - 273.15) * 1.8 + 32)}`,
          currentCondition: weather.weather[0].description,
        })
        console.log(this.state);
      }
    });
  }
  
  render() {
    return (
      <header className="header__wrapper">
        <h1>{ this.state.currentTemp }° F</h1>
        <h2>{ this.props.location }</h2>
        <p className="header__description">{ this.state.currentCondition }</p>
      </header>
    )
  }
}
