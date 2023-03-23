var apiKey = "4c74f6b3863580eb98284d7f219339f3";


const searchForm = document.querySelector('.search-bar');
const searchInput = document.querySelector('.weather-search');
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const temp = document.querySelector('.temp');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const feelsLike = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity');
const rain = document.querySelector('.rain');
const forecast = document.querySelector('.forecast');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

searchForm.addEventListener('submit', getWeatherData);

function getWeatherData(event) {
  event.preventDefault();
  const cityName = searchInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      city.innerHTML = data.name;
      date.innerHTML = formatDate(new Date());
      temp.innerHTML = `Temperature: ${Math.round(data.main.temp)}°F`;
      minTemp.innerHTML = `Min temperature: ${Math.round(data.main.temp_min)}°F`;
      maxTemp.innerHTML = `Max temperature: ${Math.round(data.main.temp_max)}°F`;
      feelsLike.innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°F`;
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
      rain.innerHTML = `Description: ${data.weather[0].description}`;
    })
    .catch(error => console.log('Error:', error));
  
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
      console.log(dailyForecasts)
      dailyForecasts.forEach((dailyForecast, index) => {
        const card = forecast.children[index];
        console.log(forecast)
        console.log(card)
        const dayName = days[new Date(dailyForecast.dt_txt).getDay()];
        const tempEl = card.querySelector('.temp');
        const minTempEl = card.querySelector('.min-temp');
        const maxTempEl = card.querySelector('.max-temp');
        const feelsLikeEl = card.querySelector('.feels-like');
        const humidityEl = card.querySelector('.humidity');
        const rainEl = card.querySelector('.rain');
        tempEl.innerHTML = `Temperature: ${Math.round(dailyForecast.main.temp)}°F`;
        minTempEl.innerHTML = `Min temperature: ${Math.round(dailyForecast.main.temp_min)}°F`;
        maxTempEl.innerHTML = `Max temperature: ${Math.round(dailyForecast.main.temp_max)}°F`;
        feelsLikeEl.innerHTML = `Feels like: ${Math.round(dailyForecast.main.feels_like)}°F`;
        humidityEl.innerHTML = `Humidity: ${dailyForecast.main.humidity}%`;
        rainEl.innerHTML = `Description: ${dailyForecast.weather[0].description}`;
        card.querySelector('h4').innerHTML = dayName;
      });
    })
    .catch(error => console.log('Error:', error));
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Pad day and month with leading zeroes if necessary
  const paddedDay = String(day).padStart(2, '0');
  const paddedMonth = String(month).padStart(2, '0');

  // Format the date as YYYY-MM-DD
  return `${year}-${paddedMonth}-${paddedDay}`;
}
