import React, { useState, useEffect } from "react";
import Heading from "../Heading";
import Forecasts from "../../common/Forecasts";
import { Container, Row, Alert } from "react-bootstrap";

import WeatherSearch from "./WeatherSearch";
import WeatherChart from "./WeatherChart";

function Home() {
  const [weatherData, setWeatherData] = useState({});
  const [forecast, setForecast] = useState({});
  const [region, setRegion] = useState("Oslo");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityFound, setCityFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [favorites, setFavorites] = useState(getFavorites);
  const [favorite, setFavorite] = useState(favorites.includes(region));
  useEffect(() => {
    favorites.includes(region) ? setFavorite(true) : setFavorite(false);
    async function fetchData() {
      setSubmitting(true);
      try {
        const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${region}&appid=94769f5dc169df80831de41cd99af1f5`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          //If city is not found
          if (geoData.length === 0) {
            setCityFound(false);
          } else {
            setCityFound(true);
            setCountry(geoData[0].country);
            setRegion(geoData[0].name);
            const lat = geoData[0].lat;
            const lon = geoData[0].lon;
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=94769f5dc169df80831de41cd99af1f5`);
            if (weatherResponse.ok) {
              let data = await weatherResponse.json();
              setWeatherData(data);
              setForecast(data.daily);
            } else {
              setError("An error occured");
            }
          }
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  function onSubmit(data) {
    setRegion(data.city);
  }

  function handleFavorite() {
    if (favorites.includes(region)) {
      setFavorites(favorites.filter((item) => item !== region));
      setFavorite(false);
    } else {
      setFavorites((oldFavorites) => [...oldFavorites, region]);
      setFavorite(true);
    }
    console.log(favorites);
  }
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (loading) {
    return (
      <Container>
        <div className="loading">Loading...</div>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <div className="error-api">ERROR: {error}</div>
      </Container>
    );
  }

  return (
    <Container>
      <Heading title="Weather Forecast" />
      <div className="city-title">
        {cityFound ? (
          <>
            <h2>
              {region} - {country}
            </h2>
            <i className={`fas fa-star ${favorite ? "star-favorite" : ""}`} onClick={handleFavorite}></i>
          </>
        ) : (
          <h2>Unknown</h2>
        )}
      </div>
      <WeatherSearch onSubmit={onSubmit} searching={submitting} />
      <WeatherChart weatherToday={weatherData.hourly} />
      {cityFound ? (
        <Row className="forecast-container m-auto ">
          {forecast.map(function (forecastDay) {
            return (
              <Forecasts
                date={forecastDay.dt}
                minTemp={forecastDay.temp.min}
                maxTemp={forecastDay.temp.max}
                weatherType={forecastDay.weather[0].description}
                weatherIcon={forecastDay.weather[0].icon}
                key={forecastDay.dt}
                windSpeed={forecastDay.wind_speed}
                windDirection={forecastDay.wind_deg}
                cloudCover={forecastDay.clouds}
                humidity={forecastDay.humidity}
              />
            );
          })}
        </Row>
      ) : (
        <Alert variant="danger">
          Oh no! Your search on <span className="region-failed">{region}</span> was not found! Please control your input and try again.
        </Alert>
      )}
    </Container>
  );
}

export default Home;

function getFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites === null) {
    favorites = [];
  }
  return favorites;
}
