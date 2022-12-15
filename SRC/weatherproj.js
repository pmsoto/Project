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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast1");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col">
      <div class="wkdays">Monday</div>
      <img
        id="day1"
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
      />
    <div>
    <span class="hottemp">65° </span
    ><span class="coldtemp">| 38°</span>
    </div>`;
  });
  forecastHTML + forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

displayForecast();

let form = document.querySelector("#searchengine");
form.addEventListener("submit", search);

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
}
