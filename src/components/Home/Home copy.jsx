import React, { useState, useEffect } from "react";
import { apiUrl } from "../../constants/api";
import Heading from "../Heading";
import Forecasts from "./Forecasts";
import { Container, Row } from "react-bootstrap";

import WeatherSearch from "./WeatherSearch";

function Home() {
  let weatherData = {};
  const [forecast, setForecast] = useState({});
  const [region, setRegion] = useState("Oslo");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log("this is me");
      const url = apiUrl + region;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setForecast(data.next_days);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [region]);

  function onSubmit(data) {
    setRegion(data.city);
  }

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

  console.log(forecast);
  return (
    <Container>
      <Heading title="Weather Forecast" />
      <div>
        <h2>
          {region} - {country}
        </h2>
      </div>
      <WeatherSearch onSubmit={onSubmit} />
      <Row className="forecast-container m-auto">
        {forecast.map(function (forecastDay) {
          return <Forecasts date={forecastDay.day} minTemp={forecastDay.min_temp.c} maxTemp={forecastDay.max_temp.c} weatherIcon={forecastDay.iconURL} weatherType={forecastDay.comment} />;
          // return <Forecasts date={forecastDay.dt} minTemp={forecastDay.temp.min} maxTemp={forecastDay.temp.max} weatherIcon={forecastDay.weather[0].icon} key={forecastDay.dt} />;
        })}
      </Row>
    </Container>
  );
}

export default Home;
