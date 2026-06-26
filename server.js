require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Check if API key is configured
if (!API_KEY) {
  console.warn('WARNING: OPENWEATHER_API_KEY is not set in .env file');
}

// Routes

// Get current weather by city name
app.get('/api/weather/current', async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      }
    );

    const data = response.data;
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      windDegree: data.wind.deg,
      cloudiness: data.clouds.all,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      visibility: (data.visibility / 1000).toFixed(1),
      coords: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
    };

    res.json(weatherData);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get weather forecast (5-day, 3-hour intervals)
app.get('/api/weather/forecast', async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      }
    );

    const data = response.data;
    const forecast = data.list.map((item) => ({
      time: new Date(item.dt * 1000),
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      cloudiness: item.clouds.all,
    }));

    res.json({
      city: data.city.name,
      country: data.city.country,
      forecast: forecast,
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    console.error('Error fetching forecast:', error.message);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

// Get weather by coordinates
app.get('/api/weather/coords', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: 'metric',
        },
      }
    );

    const data = response.data;
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      windDegree: data.wind.deg,
      cloudiness: data.clouds.all,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      visibility: (data.visibility / 1000).toFixed(1),
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Weather Dashboard API running on http://localhost:${PORT}`);
  if (!API_KEY) {
    console.log('\nNOTE: Please set OPENWEATHER_API_KEY in your .env file to use weather features');
    console.log('Get a free API key at: https://openweathermap.org/api');
  }
});

module.exports = app;
