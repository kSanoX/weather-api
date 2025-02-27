import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

// const apiKey = '3549fb39ae270e23d51b59a005a825de';
//   const city = 'Kyiv';
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = '3549fb39ae270e23d51b59a005a825de';
  const city = 'Kyiv';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="text-center">
      <Button variant={"outline"} className='rounded-xl hover:bg-sky-700'>POGODA</Button>
      <h2 className="text-2xl font-semibold">Weather in {weatherData?.name}</h2>
      <p className="text-lg">Temperature: {weatherData?.main.temp}°C</p>
      <p className="text-lg">Weather: {weatherData?.weather[0].description}</p>
      <p className="text-lg">Humidity: {weatherData?.main.humidity}%</p>
    </div>
  );
};

export default Weather;
