import React, { Component } from 'react';

// import Weather from '../../helpers/api';
// import LocationForm from '../LocationForm/LocationForm';
import './App.css';
import Data from '../Data/Data';
class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
    }
  }
  componentDidMount() {
    
  }
  
  render() {
    // let data = Weather.fetchWeatherById();
    // // let cityName = '';
    // data.then(res => {
    //   console.log(res);
    //   this.setState({cityName: res.name});
    // })
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ATX Weather</h1>
        </header>
          <Data />
          <div id="map" /> 
      </div>
    );
  }
}

export default App;
