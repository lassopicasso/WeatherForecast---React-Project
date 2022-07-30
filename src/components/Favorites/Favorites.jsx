import React, { useState, useEffect } from "react";

import { Container, Row } from "react-bootstrap";
import Heading from "../Heading";
import Forecasts from "../../common/Forecasts";

function Favorites() {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let favorites = getFavorites();

  useEffect(() => {
    favorites.map(async function (favorite) {
      try {
        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${favorite}&appid=94769f5dc169df80831de41cd99af1f5`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          const country = geoData[0].country;
          const city = geoData[0].name;
          const lat = geoData[0].lat;
          const lon = geoData[0].lon;
          const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=94769f5dc169df80831de41cd99af1f5`);
          if (weatherResponse.ok) {
            let data = await weatherResponse.json();
            let currentData = data.current;
            currentData.city = city;
            currentData.country = country;
            setCurrentWeather((oldCurrentWeather) => [...oldCurrentWeather, currentData]);
          } else {
            setError("An error occured");
          }
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Heading title="Favorites" />
      <div>
        <h2>Current Weather</h2>
      </div>
      <Row className="forecast-container m-auto">
        {currentWeather.map(function (current) {
          return (
            <Forecasts
              city={current.city}
              country={current.country}
              temp={current.temp}
              weatherType={current.weather[0].description}
              weatherIcon={current.weather[0].icon}
              key={current.city}
              windSpeed={current.wind_speed}
              windDirection={current.wind_deg}
              cloudCover={current.clouds}
              humidity={current.humidity}
            />
          );
        })}
      </Row>
    </Container>
  );
}

export default Favorites;

function getFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites"));

  if (favorites === null) {
    favorites = [];
  }
  return favorites;
}
