import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiCloudy,
  WiDayCloudy,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Bhaktapur");

  // Using async-await
  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  //     const response = await axios.get(url);
  //     setWeatherData(response.data);
  //   };
  //   fetchWeatherData();
  // }, [location]);

  //Using timeout to debounce
  useEffect(() => {
    const fetchWeatherData = setTimeout(() => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        )
        .then((response) => {
          setWeatherData(response.data);
        });
    }, 1000);

    return () => clearTimeout(fetchWeatherData);
  }, [location]);

  if (!weatherData) {
    return null;
  }

  const temperature = Math.round(weatherData.main.temp * 10) / 10;
  const description = weatherData.weather[0].description;
  const iconCode = weatherData.weather[0].icon;
  const icon = getIcon(iconCode);
  const date = moment().format("dddd, MMMM Do YYYY");

  return (
    <>
      <div className="weather-input">
        <input
          className="locationInput"
          type="text"
          placeholder="Enter City"
          maxLength="50"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="weather">
        <div className="weather-header">
          <h2 className="weather-location">{location}</h2>
          <p className="weather-date">{date}</p>
        </div>
        <div className="weather-body">
          <div className="weather-temperature">{temperature}°C</div>
          <div className="weather-icon">{icon}</div>
          <div className="weather-description">{description}</div>
        </div>
      </div>
    </>
  );
};

const getIcon = (iconCode) => {
  switch (iconCode) {
    case "01d":
      return <WiDaySunny />;
    case "01n":
      return <WiDaySunny />;
    case "02d":
      return <WiDayCloudy />;
    case "02n":
      return <WiDayCloudy />;
    case "03d":
    case "03n":
      return <WiCloudy />;
    case "04d":
    case "04n":
      return <WiCloudy />;
    case "09d":
    case "09n":
      return <WiRain />;
    case "10d":
    case "10n":
      return <WiRain />;
    case "11d":
    case "11n":
      return <WiThunderstorm />;
    case "13d":
    case "13n":
      return <WiSnow />;
    case "50d":
    case "50n":
      return <WiFog />;
    default:
      return null;
  }
};

export default Weather;
