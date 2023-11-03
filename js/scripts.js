// Variaveis e seleção de elementos

const apiKey =   process.env.WEATHER_MAP_API_KEY;
const apiKeyPexels = process.env.PEXELS_API_KEY;

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funções

const getImageData = async (name) => {
  console.log('Pesquisando por', name)
  const apiURL = `https://api.pexels.com/v1/search?query=${name.split(" ")[0]}&per_page=10&orientation=landscape`;

  const res = await fetch(apiURL, {
    cache: 'force-cache',
    headers: {
      Authorization: apiKeyPexels,
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
};

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL, {
    cache: 'force-cache'
  });
  const data = await res.json();
  console.log(data);
  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  const dataImg = await getImageData(`weather ${data.weather[0].main}`);

  const indexRandom = parseInt(Math.random() * (9 - 0) + 0);

  document.body.style.background = `url(${dataImg.photos[indexRandom].src.original}) no-repeat fixed center`;

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute(
    "src",
    `https://flagsapi.com/${data.sys.country}/shiny/64.png`
  );
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerHTML = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
