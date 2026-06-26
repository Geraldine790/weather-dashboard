// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const errorMessage = document.getElementById('errorMessage');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const loadingIndicator = document.getElementById('loadingIndicator');
const initialMessage = document.getElementById('initialMessage');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
locationBtn.addEventListener('click', handleLocationSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Main Functions
async function handleSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        showError('Please enter a city name');
        return;
    }

    await fetchWeather(city);
}

async function handleLocationSearch() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading(true);
    errorMessage.classList.remove('show');

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
            showLoading(false);
            showError(`Geolocation error: ${error.message}`);
        }
    );
}

async function fetchWeather(city) {
    showLoading(true);
    errorMessage.classList.remove('show');

    try {
        const currentResponse = await fetch(`/api/weather/current?city=${encodeURIComponent(city)}`);

        if (!currentResponse.ok) {
            const errorData = await currentResponse.json();
            throw new Error(errorData.error || 'Failed to fetch weather');
        }

        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        // Fetch forecast
        try {
            const forecastResponse = await fetch(`/api/weather/forecast?city=${encodeURIComponent(city)}`);
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                displayForecast(forecastData.forecast);
            }
        } catch (error) {
            console.error('Error fetching forecast:', error);
        }
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`/api/weather/coords?lat=${lat}&lon=${lon}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch weather');
        }

        const data = await response.json();
        displayCurrentWeather(data);
        cityInput.value = `${data.city}, ${data.country}`;

        // Fetch forecast
        try {
            const forecastResponse = await fetch(
                `/api/weather/forecast?city=${encodeURIComponent(data.city)}`
            );
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                displayForecast(forecastData.forecast);
            }
        } catch (error) {
            console.error('Error fetching forecast:', error);
        }
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

function displayCurrentWeather(data) {
    initialMessage.classList.add('hidden');
    currentWeatherSection.classList.remove('hidden');

    // Update weather header
    document.getElementById('cityName').textContent = `${data.city}, ${data.country}`;
    document.getElementById('lastUpdated').textContent = `Last updated: ${new Date().toLocaleString()}`;

    // Update weather icon and main info
    const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('temperature').textContent = Math.round(data.temperature);
    document.getElementById('description').textContent = data.description;
    document.getElementById('feelsLike').textContent = Math.round(data.feelsLike);

    // Update details
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} m/s`;
    document.getElementById('pressure').textContent = `${data.pressure} hPa`;
    document.getElementById('visibility').textContent = `${data.visibility} km`;
    document.getElementById('cloudiness').textContent = `${data.cloudiness}%`;
    document.getElementById('sunrise').textContent = data.sunrise;
    document.getElementById('sunset').textContent = data.sunset;
    document.getElementById('coordinates').textContent = `${data.coords.lat.toFixed(2)}°, ${data.coords.lon.toFixed(2)}°`;
}

function displayForecast(forecast) {
    const container = document.getElementById('forecastContainer');
    container.innerHTML = '';

    // Group forecast by day and get one entry per day
    const dailyForecasts = {};
    forecast.forEach((item) => {
        const date = new Date(item.time).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });

    // Display up to 5 days
    Object.values(dailyForecasts)
        .slice(0, 5)
        .forEach((item) => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-time">${new Date(item.time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                <img src="https://openweathermap.org/img/wn/${item.icon}@2x.png" alt="weather icon" class="forecast-icon" />
                <div class="forecast-temp">${Math.round(item.temperature)}°C</div>
                <div class="forecast-desc">${item.description}</div>
                <div class="forecast-details">
                    <div><i class="fas fa-droplet"></i> ${item.humidity}%</div>
                    <div><i class="fas fa-wind"></i> ${item.windSpeed} m/s</div>
                </div>
            `;
            container.appendChild(forecastItem);
        });

    forecastSection.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    currentWeatherSection.classList.add('hidden');
    forecastSection.classList.add('hidden');
}

function showLoading(isLoading) {
    if (isLoading) {
        loadingIndicator.classList.remove('hidden');
    } else {
        loadingIndicator.classList.add('hidden');
    }
}
