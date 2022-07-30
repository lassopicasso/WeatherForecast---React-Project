import React, { useState } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { useEffect } from "react";

function Forecasts(props) {
  const [cardIsActive, setCardIsActive] = useState(false);
  const [delayWeatherInfo, setDelayWeatherInfo] = useState(false);
  const [displayFullWeatherInfo, setDisplayFullWeatherInfo] = useState(false);
  //Added count so when initial render the useEffect won't run the functions.
  const [count, setCount] = useState(0);
  const weatherType = props.weatherType.charAt(0).toUpperCase() + props.weatherType.slice(1);
  let temp;
  if (props.minTemp) {
    temp = (
      <>
        {parseInt(props.minTemp - 273.15)}°C - {parseInt(props.maxTemp - 273.15)}°C
      </>
    );
  } else {
    temp = <>{parseInt(props.temp - 273.15)}°C</>;
  }
  const weatherIcon = `http://openweathermap.org/img/wn/${props.weatherIcon}@2x.png`;

  useEffect(() => {
    if (count) {
      if (!displayFullWeatherInfo) {
        setTimeout(() => {
          setDisplayFullWeatherInfo(!displayFullWeatherInfo);
          console.log("hello");
        }, 400);
      } else {
        setDisplayFullWeatherInfo(!displayFullWeatherInfo);
      }

      //According to following article, the timeout need to be cleared to avoid adverse consequences https://felixgerschau.com/react-hooks-settimeout/
      return () =>
        clearTimeout(() => {
          setTimeout(function () {
            setDisplayFullWeatherInfo(!displayFullWeatherInfo);
          }, 800);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayWeatherInfo]);

  return (
    <Card
      style={{ width: "18rem" }}
      variant="success"
      className={`card shadow p-3 rounded ${cardIsActive ? "card-expand" : ""} `}
      onClick={function () {
        setCardIsActive(!cardIsActive);
        setCount(1);
        setDelayWeatherInfo(!delayWeatherInfo);
      }}
    >
      <Card.Body>
        {props.date ? (
          <Card.Title className="pb-3">{moment.unix(props.date).format("dddd - Do of MMMM")}</Card.Title>
        ) : (
          <Card.Title className="pb-3">
            {props.city} - {props.country}
          </Card.Title>
        )}
        <div className="card-details">
          {displayFullWeatherInfo ? (
            <div className="card-details-text">
              <div>
                <Card.Subtitle>{weatherType}</Card.Subtitle>
                <Card.Text className="card-details-border">
                  <span className="d-block">Cloud cover: {props.cloudCover}%</span>
                  Temp: {temp}
                </Card.Text>
              </div>
              <div>
                <Card.Subtitle>Wind</Card.Subtitle>
                <Card.Text className="card-details-border">
                  <span className="d-block">{props.windSpeed} m/s</span> <i className="fas fa-long-arrow-alt-up fa-lg" style={{ transform: `rotate(${props.windDirection * 2}deg)` }}></i>
                </Card.Text>
              </div>
              <div>
                <Card.Subtitle>Wind</Card.Subtitle>
                <Card.Text className="card-details-border">Windy</Card.Text>
              </div>
            </div>
          ) : (
            <div>
              <Card.Subtitle>Weather</Card.Subtitle>

              <Card.Text>
                {weatherType}
                <span className="d-block">Temp: {temp}</span>
                {props.windSpeed} m/s
              </Card.Text>
            </div>
          )}
          {/* <div>
            <Card.Subtitle>{props.weatherType}</Card.Subtitle>
            <Card.Text className="">{temp}</Card.Text>
          </div> */}
          <img className="weatherImg" src={weatherIcon} alt={props.weatherType} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default Forecasts;
