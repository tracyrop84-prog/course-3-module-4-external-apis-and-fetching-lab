// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function displayAlerts(data) {
  alertsDisplay.innerHTML = "";

  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  const heading = document.createElement("h2");
  heading.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(heading);

  const list = document.createElement("ul");

  data.features.forEach((alert) => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });

  alertsDisplay.appendChild(list);
}

function displayError(message) {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(weatherApi + state);

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts.");
    }

    const data = await response.json();
    displayAlerts(data);
  } catch (error) {
    displayError(error.message);
  }
}

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();

  stateInput.value = "";

  if (state === "") {
    displayError("Please enter a state abbreviation.");
    return;
  }

  fetchWeatherAlerts(state);
});
// Your code here!
