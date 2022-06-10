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

// Display Weather Data via City Search

function displayWeatherCondition(response) {
  let weatherIcon = document.querySelector("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) + "°C";
  document.querySelector("#description").innerHTML = response.data.weather[0].description.toUpperCase();
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind Speed: ${response.data.wind.speed}km/h`;
  
  weatherIcon.innerHTML =
    "<img src = " +
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` +
    ">";
   
  getForecast(response.data.coord);
}

//City Search

function search(city) {
  let apiKey = "1f2d8bf7dc540c2f322d67fdcb29261c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=5&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form").value;

  search(city);
}

let enterCityForm = document.querySelector(".search-engine");
enterCityForm.addEventListener("submit", showCity);

//Five Day Forecast

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#five-day-forecast");
  let day = ["Thurs", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class = "row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class = "col-2">
          <div class = "five-day-forecast">${day}</div>
            <img src = "http://openweathermap.org/img/wn/10d@2x.png" alt = "forecast-icon" width = "40"/>
            <div class = " forecast-description">cloudy</div>
            <div class = "forecast-temperatures">
              <span class = "forecast-min-temp">18</span>
              <span class = "forecast-max-temp">32</span>
            </div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "1f2d8bf7dc540c2f322d67fdcb29261c";
  let apiUrl =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayForecast);
}

//Display Weather via Location Search

function showTemperature(response) {
  let weatherIcon = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}°C`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description.toUpperCase();
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind Speed: ${response.data.wind.speed}km/h`;
   
   weatherIcon.innerHTML = 
     "<img src = " + 
     `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` + ">";
   
  celsiusTemp = response.data.main.temp;
  
  getForecast(response.data.coord);
  displayForecast(response);
}

//Location Search

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "1f2d8bf7dc540c2f322d67fdcb29261c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

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
  let farenheit = (celsiusTemp * 9) / 5 + 32;
  celsius.innerHTML = `${Math.round(farenheit)}°F`;
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

let celsiusTemp = null;

let changeToFarenheitLink = document.querySelector("#farenheit-link");
changeToFarenheitLink.addEventListener("click", changeToFarenheit);

let changeToCelsiusLink = document.querySelector("#celsius-link");
changeToCelsiusLink.addEventListener("click", changeToCelsius);



