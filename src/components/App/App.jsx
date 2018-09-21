import React, { Component } from 'react';
// import weatherAPI from '../api/api';
// import Weather from '../../helpers/api';
// import LocationForm from '../LocationForm/LocationForm';
import './App.css';
import Conditions from '../Conditions/Conditions';
import Header from '../Header/Header';
import Forecast from '../Forecast/Forecast';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
    }
  }
  componentDidMount() {
    
  }
  
  render() {
    return (
      <div className="App">
        <Header location="Austin, TX" />
        <Conditions />
        <Forecast />
      </div>
    );
  }
}

export default App;
