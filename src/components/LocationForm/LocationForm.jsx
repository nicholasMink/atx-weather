import React, { Component } from 'react'

export class LocationForm extends Component {
  render() {
    return (
      <div>
        <form >
          <input type='text' placeholder='Zip Code' />
          <button type='submit' />
        </form>
      </div>
    )
  }
}
export default LocationForm