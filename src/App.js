import React, { useState } from 'react';
import './App.css';
import WeatherInfo from './WeatherInfo';
import WeatherChart from './WeatherChart';

function App() {
  const [city, setCity] = useState('hyderabad');
  const [submittedCity, setSubmittedCity] = useState('hyderabad');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedCity(city);
  };

  return (
    <div className="App">
      <h1>🌦 Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      <WeatherInfo city={submittedCity} />
      <WeatherChart city={submittedCity} />
    </div>
  );
}

export default App;
