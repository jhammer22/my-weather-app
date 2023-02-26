// id's used
  // submitbtn: submit button for city search


// class's used on weather elements in html
  // weather-search : city search input area
  // weather: container for  current weather
  // forecast: container for 5 day weather cards
  // card: forecast card
  // city
  // date
  // temp
  // min-temp
  // max-temp
  // feels-like
  // humidity
  // rain

// API key and base URL for OpenWeatherMap API
const apiKey = "4c74f6b3863580eb98284d7f219339f3";
const recentSearch = [];
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var currentDayTime = $("#time-location");
var searchListElement = document.getElementByID("search-list");




function getCurrentWeather() {
  currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  fetch(currentUrl)
  .then((response)=> response.json())
  .then((data) => {
    localStorage.setItem("weather data", JSON.stringify(data))
    displayWeather()
  })
}

function get5DayForecast() {
  fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  fetch(fiveDayUrl)
  .then((response)=> response.json())
  .then((data) => {
    localStorage.setItem("five day data", JSON.stringify(data))
    displayFiveDay()
  })
}

function getWithCiity () {
  fetch(geoAPIURL)
  .then((response)=> response.json())
  .then((data) => {
    localStorage.setItem("geo data", JSON.stringify(data))
      lat = data.coord.lat
      lon = data.coord.lon
      console.log(geoData)
      console.log(lat, lon)
      getCurrentWeather();
      get5DayForecast();
  })
}

