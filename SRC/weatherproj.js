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
current.innerHTML = `${day} ${hours}:${minutes}`;

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

function showTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let temperatureLog = document.querySelector("#temperature");
  temperatureLog.innerHTML = `${temperature}°F`;

  let descriptionLog = document.querySelector(".description");
  let description = response.data.condition.description;
  descriptionLog.innerHTML = `${description}`;

  let humidityLog = document.querySelector("#humid");
  let humidity = response.data.temperature.humidity;
  humidityLog.innerHTML = `${humidity}%`;
}
