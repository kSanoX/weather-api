import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { CloudDrizzle, Thermometer, CircleArrowDown } from "lucide-react";

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
  const [city, setCity] = useState<string>("");
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchData = async () => {
    if (!city.trim()) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };


  return (
    <div className={`center-text text-3xl`}>
      <h1 className="text-3xl py-6">Type your city</h1>
      <Input
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="m-auto max-w-2xl p-6 rounded-xl border-lime-100"
      />
      {weatherData && (
        <div className="mt-4 flex flex-col gap-2" >
          <h2>Weather in {weatherData.name}</h2>
          <p className="flex items-center justify-center"><Thermometer size={32}/> Temperature: {weatherData.main.temp}°C</p>
          <p className="flex items-center justify-center"><CloudDrizzle size={32}/> Weather: {weatherData.weather[0].description}</p>
          <p className="flex items-center justify-center"><CircleArrowDown size={32}/> Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;


