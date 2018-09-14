import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';

const TipText = ({ text }) => <div className="tipText">{text}</div>;

export default class Map extends Component {
  static defaultProps = {
    center: {
      lat: 30.27,
      lng: -97.745
    },
    zoom: 11
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }} >
        <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyDlRnBdMvhFPtUdJnramc_kLQOwMEyfbYs' }} defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
          <TipText lat={30.231798} lng={-97.780521} text={'MINK Weather Station'} />
        </GoogleMapReact>
      </div>
    )
  }
}
