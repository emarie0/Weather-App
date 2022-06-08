//Date
let now = new Date();

let currentDate = document.querySelector("h2");

let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

currentDate.innerHTML = day + " " + month + " " + date + ", " + year;

//Time
let currentTime = document.querySelector("h3");

let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = "0" + minute;
}
let ampm = hour <= 12 ? "am" : "pm";
hour = hour % 12;
hour = hour ? hour : 12;

currentTime.innerHTML = hour + ": " + minute + " " + ampm;

// Search City
function displayWeatherIcon(response) {
  let icon = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  console.log(iconCode);
  document.querySelector("#icon").innerHTML ="<img src = " + `https://openweathermap.org/img/wn/${iconCode}@2x.png` + ">";
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) + "°C";
  document.querySelector("#description").innerHTML = response.data.weather[0].description.toUpperCase();
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  displayWeatherIcon(response);
}

function search(city) {
  let apiKey = "1f2d8bf7dc540c2f322d67fdcb29261c";
  let units = "metric";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=5&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form").value;

  search(city);
}

let enterCityForm = document.querySelector(".search-engine");
enterCityForm.addEventListener("submit", showCity);

//Current Location

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}°C`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description.toUpperCase();
  document.querySelector("#humidity").innerHTML =response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  displayWeatherIcon(response);
}

function retrievePosition(position) {
  let latitude = position.data.coord.lat;
  let longitude = position.data.coord.lon;
  let units = "metric";
  let apiKey = "1f2d8bf7dc540c2f322d67fdcb29261c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&cnt=5&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

//Temp Change

function changeToFarenheit(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature");
  let farenheit = (celsius * 9) / 5 + 32;
  celsius.innerHTML = `${farenheit}°F`;
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let celsius = ((temperature - 32) * 5) / 9;
  temperature.innerHTML = `${celsius}°C`;
}

let changeToFarenheitLink = document.querySelector("#farenheit-link");
changeToFarenheitLink.addEventListener("click", changeToFarenheit);

let changeToCelsiusLink = document.querySelector("#celsius-link");
changeToCelsiusLink.addEventListener("click", changeToCelsius);

//Five day Forecast
