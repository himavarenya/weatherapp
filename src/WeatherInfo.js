import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather(null);
      }
    };

    if (city) fetchWeather();
  }, [city]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>🌡 Temperature: {weather.main.temp} °C</p>
      <p>☁ Weather: {weather.weather[0].description}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherInfo;
