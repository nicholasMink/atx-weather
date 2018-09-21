import idb from 'idb';
import axios from 'axios';

// const DATA_URL = `https://s3.amazonaws.com/elasticbeanstalk-us-east-1-945643862093/weather/`;
const DATA_URL_TEST = `https://s3.amazonaws.com/elasticbeanstalk-us-east-1-945643862093/weather/`;
// const HISTORIC_DATA_URL_TEST = `https://s3.amazonaws.com/elasticbeanstalk-us-east-1-945643862093/weather/weather-hist.json`;
const WEATHER_URI_TEST = `weather-hist.json`;
const FORECAST_URI = `https://s3.amazonaws.com/elasticbeanstalk-us-east-1-945643862093/weather/forecast.json`;
// const FORECAST_URI_TEST = `weather-hist.json`;
// const FORECAST_URI = `forecast.json`;
// const HISTORIC_DATA_URL = `weather-hist.json`;

class dbAPI {

  static openDB() {
    if (!navigator.serviceWorker) {
      return Promise.resolve()
    }
    return idb.open('atx-weather', 1, upgradeDb => {
      if (!upgradeDb.objectStoreNames.contains('atx-weather')) {
        upgradeDb.createObjectStore('atx-weather', {
          keyPath: 'id'
        })
        console.log('>>>>>>> Created atx-weather object store');
      }
      if (!upgradeDb.objectStoreNames.contains('atx-forecast')) {
        upgradeDb.createObjectStore('atx-forecast', {
          keyPath: 'dt'
        });
        console.log('>>>>>>> Created atx-forecast object store');
      }
      if (!upgradeDb.objectStoreNames.contains('offline-queue')) {
        upgradeDb.createObjectStore('offline-queue', {
          keyPath: 'id',
          autoIncrement: true
        })
        console.log('>>>>>>> Created offline-queue object store');
      }
    })
  }

  static getCachedWeather() {
    const dbPromise = dbAPI.openDB();
    return dbPromise.then(db => {
      if (!db) return;
      const tx = db.transaction('atx-weather');
      const store = tx.objectStore('atx-weather');
      return store.getAll();
    })
  }

  static fetchWeather(cb) {
    dbAPI.getCachedWeather().then(data => {
      if (!data) {
        axios.get(DATA_URL_TEST + WEATHER_URI_TEST, {
          // credentials:'same-origin'
        }).then(response => {
          let data = response.data;
          const dbPromise = dbAPI.openDB();
          dbPromise.then(db => {
            if (!db) return;
            console.log('cached weather:', data);
            const index = db.transaction('atx-weather', 'readwrite').objectStore('atx-weather');
            index.put(data);
          });
          return cb(null, data);
        }).catch(error => cb(error, null));
      }
      else if (data.length > 0) {
        return cb(null, data[0]);
      }
      axios.get(DATA_URL_TEST + WEATHER_URI_TEST, {
        // credentials:'same-origin'
      }).then(response => {
        let data = response.data;
        const dbPromise = dbAPI.openDB();
        dbPromise.then(db => {
          if (!db) return;
          console.log('weather updated:', data);
          const index = db.transaction('atx-weather', 'readwrite').objectStore('atx-weather');
          index.put(data);
        });
        return cb(null, data);
      }).catch(error => cb(error, null));
    });
  }

  static fetchConditions(cb) {
    dbAPI.fetchWeather((error, weather) => {
      if (error) {
        cb(error, null);
      } else {
        cb(null, weather)
      }
    });
  }

  static fetchThreeDay(cb) {
    dbAPI.fetchForecast((error, forecast) => {
      if (error) {
        cb(error, null);
      } else {
        cb(null, forecast)
      }
    })
  }

  static postHistoricWeather(data) {
    console.log('posting weather data:', data);
    axios.post(DATA_URL_TEST + WEATHER_URI_TEST, {
      method: 'POST',
      body: data,
    })
    .then(response => console.log(response))
    .catch(error => console.log('ERROR POSTING TO AWS:', error))
  }

  static getCachedForecast() {
    const dbPromise = dbAPI.openDB();
    return dbPromise.then(db => {
      if (!db) return;
      const tx = db.transaction('atx-forecast');
      const store = tx.objectStore('atx-forecast');
      return store.getAll();
    })
  }

  static fetchForecast(cb) {
    dbAPI.getCachedForecast().then(data => {
      if (!data) {
        axios.get(FORECAST_URI, {
          // credentials:'same-origin'
        }).then(response => {
        const dbPromise = dbAPI.openDB();
        dbPromise.then(db => {
          if (!db) return;
          console.log('FORECAST fetched:', response);
          const index = db.transaction('atx-forecast', 'readwrite').objectStore('atx-forecast');
          response.data.list.forEach(threeHRdata => index.put(threeHRdata));
        });
          console.log('cached forecast:', response)
          return cb(null, response);
        }).catch(error => cb(error, null));
      }
      else if (data.length > 0) {
        return cb(null, data.splice(0, 16));
      }
      axios.get(FORECAST_URI, {
      }).then(response => {
      const dbPromise = dbAPI.openDB();
      dbPromise.then(db => {
        if (!db) return;
        console.log('FORECAST fetched:', response);
        const index = db.transaction('atx-forecast', 'readwrite').objectStore('atx-forecast');
        response.data.list.forEach(threeHRdata => index.put(threeHRdata));
      });
        console.log('forecast updated:', response)
        return cb(null, response);
      }).catch(error => cb(error, null));
    });
  }
}

// module.exports = dbAPI
export default dbAPI