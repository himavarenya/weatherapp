import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const WeatherChart = ({ city }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );

        const forecast = response.data.list.slice(0, 8); // next 24 hours (3-hr interval)
        const labels = forecast.map(item =>
          new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        );
        const temperatures = forecast.map(item => item.main.temp);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatures,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching forecast:", err);
      }
    };

    fetchForecast();
  }, [city]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h3>🌡 Temperature Forecast (Next 24 hrs)</h3>
      <Line data={chartData} />
    </div>
  );
};

export default WeatherChart;
