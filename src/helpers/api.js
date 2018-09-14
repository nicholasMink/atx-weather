class Weather {
  static getDBurl = () => 'https://s3.amazonaws.com/elasticbeanstalk-us-east-1-945643862093/weather/weather-hist.json';
  static fetchWeatherById(id = '420036361') {
    
    return (
      fetch(Weather.getDBurl())
      .then(response => {
        console.log(response)
        if (response.status === 429) {
          return {
            name: 'Austin',
            weather: {
              rain: 'light rain',
            },
            rain: {
              '1h' : 25
            },
          }
        }
        return response.json()
      })
      .catch(error => error)
    )
  }
}
export default Weather;