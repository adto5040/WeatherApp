'user strict';

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  loadingText.style.display = 'block';
  weatherBox.style.display = 'none';
  const cityName = searchCity.value;
  if (cityName.trim().length == 0) {
    return alert('Please enter a city name');
  }
  const http = new XMLHttpRequest();
  const API_KEY = '3c1653b3a9589bb1f89e9510d96ffb8c';
  const url =
    'http://api.openweathermap.org/data/2.5/weather?q=' +
    cityName +
    '&units=metric&appid=' +
    API_KEY;
  const method = 'GET';

  http.open(method, url);
  http.onreadystatechange = function () {
    const STATUS_CODE_OK = 200;
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status == STATUS_CODE_OK) {
        const data = JSON.parse(http.responseText);
        let weatherData = new Weather(
          cityName,
          data.weather[0].description.toUpperCase()
        );
        weatherData.temperature = data.main.temp;
        updateWeather(weatherData);
      } else {
        alert('Something went wrong!');
      }
    }
  };
  http.send();
}

function updateWeather(weatherData) {
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperatur.textContent = weatherData.temperature;

  loadingText.style.display = 'none';
  weatherBox.style.display = 'block';
}