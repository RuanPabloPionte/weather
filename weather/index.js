const apiKey = "a644acb71edd489085a163645232107";

const getHtmlElements = () => {
  const htmlElements = {
    searchBtn: document.querySelector("#searchBtn"),
    searchInput: document.querySelector("#searchInput"),
    currentImg: document.querySelector("[data-currentImg]"),
    currentText: document.querySelector("[data-currentText]"),
    currentTemp: document.querySelector("[data-currentTemp]"),
    currentCityName: document.querySelector("[data-currentCityName]"),
    allForecast: document.querySelector("[data-allForecast]"),
  };

  return htmlElements;
};

const renderWeather = (weather) => {
  const htmlElements = getHtmlElements();
  // console.log(weather);
  htmlElements.currentImg.src = weather.current.condition.icon;
  htmlElements.currentText.innerText = weather.current.condition.text;
  htmlElements.currentTemp.innerText = weather.current.temp_c;
  htmlElements.currentCityName.innerText = weather.location.name;
};

const renderforecast = (forecast) => {
  // console.log(forecast);

  const htmlElements = getHtmlElements();
  const sectionAllforecast = htmlElements.allForecast;

  const sectionForcast = document.createElement("section");
  sectionForcast.classList.add(
    "container",
    "forcast-container",
    "bg-trasparent",
    "mt-4",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );

  const imgForcast = document.createElement("img");
  imgForcast.src = forecast.day.condition.icon;

  const text = document.createElement("span");
  text.innerText = forecast.day.condition.text;

  const maxMinTemp = document.createElement("span");
  maxMinTemp.innerText = `${forecast.day.mintemp_c} / ${forecast.day.maxtemp_c}`;

  sectionForcast.append(imgForcast, text, maxMinTemp);
  sectionAllforecast.append(sectionForcast);
};
// renderWeather();
let city = "Colatina";

const searchCity = () => {
  const htmlElements = getHtmlElements();

  htmlElements.searchBtn.addEventListener("click", () => {
    try {
      city = htmlElements.searchInput.value;
      htmlElements.allForecast.innerHTML = "";
      fechtWeather();
      htmlElements.searchInput.value = "";
    } catch {
      alert("Error: " + htmlElements.searchInput.value);
    }
  });
};

searchCity();

const fechtWeather = async () => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2&aqi=yes&lang=pt&alerts=no`
    );

    if (!response.ok) {
      throw new Error("Não foi possível obter os dados do clima.");
    }

    const weather = await response.json();
    renderWeather(weather);
    const forecast = weather.forecast.forecastday;
    forecast.forEach(renderforecast);
  } catch (error) {
    alert("Erro ao obter os dados do clima:", error.message);
  }
};

fechtWeather();
