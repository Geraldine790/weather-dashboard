# Weather Dashboard

A modern, responsive weather dashboard application that fetches real-time weather data from the OpenWeatherMap API.

## Features

- ✅ **Current Weather Display**: Shows real-time weather information for any city
- ✅ **5-Day Forecast**: Get weather predictions for the next 5 days
- ✅ **Geolocation Support**: Automatically fetch weather for your current location
- ✅ **Detailed Metrics**: Humidity, wind speed, pressure, visibility, sunrise/sunset times
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Beautiful UI**: Modern gradient design with smooth animations
- ✅ **Error Handling**: User-friendly error messages and validation
- ✅ **Real-time Icon**: Weather condition icons from OpenWeatherMap

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier available)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key from your account settings
   - Copy your API key

4. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` and replace `your_api_key_here` with your actual API key
   ```
   OPENWEATHER_API_KEY=your_actual_api_key
   PORT=3000
   NODE_ENV=development
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with automatic restart on file changes (requires nodemon).

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. **Search by City Name**: Type a city name in the search box and click "Search" or press Enter
2. **Use Current Location**: Click the location button to automatically fetch weather for your current location
3. **View Details**: The current weather section displays comprehensive weather information
4. **Check Forecast**: Scroll down to see the 5-day weather forecast

## API Endpoints

### GET /api/weather/current
Fetch current weather for a city
- **Query Parameters**: `city` (required)
- **Example**: `/api/weather/current?city=London`

### GET /api/weather/forecast
Fetch 5-day weather forecast
- **Query Parameters**: `city` (required)
- **Example**: `/api/weather/forecast?city=London`

### GET /api/weather/coords
Fetch weather by coordinates
- **Query Parameters**: `lat` (required), `lon` (required)
- **Example**: `/api/weather/coords?lat=51.5074&lon=-0.1278`

### GET /api/health
Health check endpoint
- **Example**: `/api/health`

## Project Structure

```
weather-dashboard/
├── public/
│   ├── index.html       # Main HTML file
│   ├── styles.css       # Styling
│   └── script.js        # Frontend JavaScript
├── server.js            # Express server and API routes
├── package.json         # Project dependencies
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (Flexbox, Grid, Animations)
  - Vanilla JavaScript (Fetch API)
  - Font Awesome Icons

- **Backend**:
  - Node.js
  - Express.js
  - Axios (HTTP client)
  - dotenv (Environment variables)

- **API**:
  - OpenWeatherMap API

## Features Explanation

### Current Weather Information
- Temperature and "feels like" temperature
- Weather description with icon
- Humidity percentage
- Wind speed (m/s)
- Atmospheric pressure (hPa)
- Visibility (km)
- Cloud coverage percentage
- Sunrise and sunset times
- Geographic coordinates

### 5-Day Forecast
- Daily weather predictions
- Temperature trends
- Weather icons
- Humidity and wind speed for each day

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop views
- Touch-friendly interface
- Optimized for all screen sizes

## Error Handling

- Validates city name input
- Handles API errors gracefully
- Displays user-friendly error messages
- Manages geolocation errors
- Checks for missing API key configuration

## Styling Features

- Modern gradient background
- Card-based layout
- Smooth animations and transitions
- Hover effects for better interactivity
- Loading spinner
- Responsive grid layouts
- Color-coded weather details

## Performance Considerations

- Efficient API calls (minimizes redundant requests)
- Lazy loading of forecast data
- CSS transitions for smooth animations
- Optimized image sizes for icons
- Responsive images for different screen sizes

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

- [ ] Add temperature unit toggle (Celsius/Fahrenheit)
- [ ] Favorite cities functionality with local storage
- [ ] Multiple city comparison
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Weather charts and analytics
- [ ] Dark/Light theme toggle
- [ ] Integration with other weather data sources
- [ ] Hourly forecast view
- [ ] Air quality index (AQI) display

## Troubleshooting

### API Key Not Working
- Verify your API key is correctly set in the `.env` file
- Check that your OpenWeatherMap account is activated
- Ensure the API key hasn't expired
- Check OpenWeatherMap's status page

### City Not Found
- Ensure the city name is spelled correctly
- Try using the full city name with country code (e.g., "London, UK")
- Some small towns may not be available in the API

### Geolocation Not Working
- Check browser permissions for location access
- Ensure HTTPS is used (geolocation requires secure context)
- Try allowing permissions when prompted

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the current port

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org) for the weather API
- [Font Awesome](https://fontawesome.com) for icons
- [Express.js](https://expressjs.com) for the web framework

## Contact

For questions or suggestions, please reach out through GitHub.

---

**Made with ❤️ for weather enthusiasts**
