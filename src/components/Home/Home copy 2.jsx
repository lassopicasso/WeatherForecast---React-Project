import React, { useState, useEffect } from "react";
// import { apiUrl } from "../../constants/api";
import Heading from "../Heading";
import Forecasts from "./Forecasts";
import { Container, Row } from "react-bootstrap";

import WeatherSearch from "./WeatherSearch";

function Home() {
  let weatherData = {};
  const [forecast, setForecast] = useState([]);
  const [region, setRegion] = useState("Karmøy");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async function fetchData(region) {
    try {
      console.log("hello");
      const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${region}&appid=94769f5dc169df80831de41cd99af1f5`);
      if (geoResponse.ok) {
        let geoData = await geoResponse.json();
        setCountry(geoData[0].country);
        setRegion(geoData[0].name);
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=94769f5dc169df80831de41cd99af1f5`);
        if (response.ok) {
          weatherData = await response.json();
          setForecast(weatherData.daily);
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
  }, []);

  // function onSubmit(data) {
  //   setRegion(data.city);
  //   // fetchData(data.city);
  // }
  // const onSubmit = (data) => {
  //   useEffect(() => {
  //     setRegion(data.city);
  //     fetchData(region);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [region]);
  // };

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

  // let key = 0;
  // let dayForward = 0;
  console.log("hello");
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
          return <Forecasts date={forecastDay.dt} minTemp={forecastDay.temp.min} maxTemp={forecastDay.temp.max} weatherIcon={forecastDay.weather[0].icon} key={forecastDay.dt} />;
        })}
      </Row>
    </Container>
  );
}

export default Home;
