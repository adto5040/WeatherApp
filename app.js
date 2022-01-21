import * as ELEMENTS from 'init';
import { Http } from 'http';
import { WeatherData, WEATHER_PROXY_HANDLER } from 'weather-data'

const API_KEY = '3c1653b3a9589bb1f89e9510d96ffb8c';

ELEMENTS.searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  ELEMENTS.loadingText.style.display = 'block';
  ELEMENTS.weatherBox.style.display = 'none';
  const cityName = ELEMENTS.searchCity.value;
  if (cityName.trim().length == 0) {
    return alert('Please enter a city name');
  }

  const URL =
    'http://api.openweathermap.org/data/2.5/weather?q=' +
    cityName +
    '&units=metric&appid=' +
    API_KEY;

  Http.fetchData(URL).then(responseData => {
    const weatherData = new WeatherData(
      cityName,
      responseData.weather[0].description.toUpperCase()
    );
    const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
    WEATHER_PROXY.temperature = responseData.main.temp;
    updateWeather(weatherData);
  })
  .catch(error => alert(error))
}

function updateWeather(weatherData) {
  ELEMENTS.weatherCity.textContent = weatherData.cityName;
  ELEMENTS.weatherDescription.textContent = weatherData.description;
  ELEMENTS.weatherTemperatur.textContent = weatherData.temperature;

  ELEMENTS.loadingText.style.display = 'none';
  ELEMENTS.weatherBox.style.display = 'block';
}