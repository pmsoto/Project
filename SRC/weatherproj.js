let now = new Date();

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
let hours = ("0" + now.getHours()).slice(-2);
let minutes = ("0" + now.getMinutes()).slice(-2);

let current = document.querySelector(".date");
current.innerHTML = `Updated: ${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast1");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
      <div class="wkdays">${formatDay(forecastDay.time)}</div>
      <img
        id="day1"
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          response.data.daily[0].condition.icon
        }.png"
      />
    <br /> 
    <span class="hottemp">${Math.round(forecastDay.temperature.maximum)}° </span
    ><span class="coldtemp">| ${Math.round(
      forecastDay.temperature.minimum
    )}°</span>
    <div class="info">${forecastDay.condition.description}</div>
    </div>`;
      forecastHTML + forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  let h1 = document.querySelector("h1");
  let apiKey = "6caa16b0540f85od4c55153dbff8tb89";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  h1.innerHTML = `${city}`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#searchengine");
form.addEventListener("submit", search);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `6caa16b0540f85od4c55153dbff8tb89`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function showTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let temperatureLog = document.querySelector("#temperature");
  temperatureLog.innerHTML = `${temperature}`;

  let descriptionLog = document.querySelector(".description");
  let description = response.data.condition.description;
  descriptionLog.innerHTML = `${description}`;

  let humidityLog = document.querySelector("#humid");
  let humidity = response.data.temperature.humidity;
  humidityLog.innerHTML = `${humidity}%`;

  let windLog = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windLog.innerHTML = `${wind} mph`;

  let iconLog = document.querySelector("#main-icon");
  let iconKey = response.data.condition.icon;
  iconLog.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconKey}.png`
  );

  getForecast(response.data.coordinates);
}
