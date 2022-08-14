import React, { useState, useEffect } from "react";
import Heading from "../Heading";
import Cards from "../../common/Cards";
import { Container, Row, Alert } from "react-bootstrap";
import WeatherSearch from "./WeatherSearch";
import WeatherChart from "./WeatherChart";

function Home() {
  const [weatherData, setWeatherData] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [region, setRegion] = useState(function () {
    let lastVisited = JSON.parse(localStorage.getItem("lastVisited"));
    return lastVisited === null ? "Oslo" : lastVisited;
  });
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityFound, setCityFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [favorites, setFavorites] = useState(getFavorites);
  const [favorite, setFavorite] = useState(favorites.includes(region));
  useEffect(() => {
    document.title = "Weatherish";
  }, []);
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
            localStorage.setItem("lastVisited", JSON.stringify(geoData[0].name));
            const lat = geoData[0].lat;
            const lon = geoData[0].lon;
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=94769f5dc169df80831de41cd99af1f5`);
            if (weatherResponse.ok) {
              let data = await weatherResponse.json();
              setWeatherData(data);
              setCurrentWeather(data.current);
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

      {cityFound ? (
        <>
          <div className="home-currentAndGraph">
            <WeatherChart weatherToday={weatherData.hourly} />
            <Cards
              currentHome={true}
              temp={currentWeather.temp}
              weatherType={currentWeather.weather[0].description}
              weatherIcon={currentWeather.weather[0].icon}
              windSpeed={currentWeather.wind_speed}
              windDirection={currentWeather.wind_deg}
              cloudCover={currentWeather.clouds}
              rain={currentWeather.rain}
              humidity={currentWeather.humidity}
              feelsLike={currentWeather.feels_like}
            />
          </div>
          <Row className="forecast-container m-auto ">
            {forecast.map(function (forecastDay) {
              return (
                <Cards
                  date={forecastDay.dt}
                  minTemp={forecastDay.temp.min}
                  maxTemp={forecastDay.temp.max}
                  weatherType={forecastDay.weather[0].description}
                  weatherIcon={forecastDay.weather[0].icon}
                  key={forecastDay.dt}
                  windSpeed={forecastDay.wind_speed}
                  windDirection={forecastDay.wind_deg}
                  cloudCover={forecastDay.clouds}
                  rain={forecastDay.rain}
                  humidity={forecastDay.humidity}
                />
              );
            })}
          </Row>
        </>
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
