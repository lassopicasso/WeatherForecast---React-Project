import React, { useState } from "react";
import { Card, Collapse, Button } from "react-bootstrap";
import moment from "moment";
import { useEffect } from "react";

function Cards(props) {
  const [cardIsActive, setCardIsActive] = useState(false);
  const [delayWeatherInfo, setDelayWeatherInfo] = useState(false);
  const [displayFullWeatherInfo, setDisplayFullWeatherInfo] = useState(false);
  const [open, setOpen] = useState(false);
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
  const weatherIcon = `https://openweathermap.org/img/wn/${props.weatherIcon}@2x.png`;

  useEffect(() => {
    if (count) {
      if (!displayFullWeatherInfo) {
        setTimeout(() => {
          setDisplayFullWeatherInfo(!displayFullWeatherInfo);
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
  let rain;
  if (props.rain && typeof props.rain === "number") {
    rain = props.rain;
  } else if (props.rain) {
    rain = props.rain["1h"];
  }

  let cardTitle = getCardTitle(props);

  return (
    <>
      {window.innerWidth > 700 ? (
        <Card
          style={{ width: "18rem" }}
          variant="success"
          className={`card shadow p-3 rounded ${cardIsActive ? "card-expand" : ""} ${props.currentHome ? "card-expand card-current-home" : ""}`}
          onClick={function () {
            setCardIsActive(!cardIsActive);
            setCount(1);
            setDelayWeatherInfo(!delayWeatherInfo);
          }}
        >
          <Card.Body>
            {cardTitle}
            <div className="card-details">
              {displayFullWeatherInfo || props.currentHome ? (
                fullWeatherInfo(props, rain, temp, weatherType, weatherIcon)
              ) : (
                <>
                  <div>
                    <Card.Subtitle>Weather</Card.Subtitle>

                    <Card.Text>
                      {weatherType}
                      <span className="d-block">{rain ? "Rain: " + rain + "mm" : "Rain: 0 mm"}</span>
                      Temp: <span className="card-temperatur">{temp}</span>
                    </Card.Text>
                  </div>
                  <img className="weatherImg" src={weatherIcon} alt={props.weatherType} />
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="card__dropdown">
          <Button className="card__feature" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
            {cardTitle}
            <div>{temp} </div>
            <img className="weatherImg" src={weatherIcon} alt={props.weatherType} />
            {open ? (
              <div className="feature__arrow">
                <i className="fas fa-chevron-up"></i>{" "}
              </div>
            ) : (
              <div className="feature__arrow">
                <i className="fas fa-chevron-down"></i>
              </div>
            )}
          </Button>
          <Collapse className="card__collapse" in={open}>
            <div id="example-collapse-text">{fullWeatherInfo(props, rain, temp, weatherType)}</div>
          </Collapse>
        </Card>
      )}
    </>
  );
}

export default Cards;

function getCardTitle(props) {
  if (window.innerWidth > 700) {
    if (props.date) {
      return <Card.Title className="pb-3">{moment.unix(props.date).format("dddd - Do of MMM  ")}</Card.Title>;
    } else if (props.currentHome) {
      return <Card.Title className="pb-3">Current</Card.Title>;
    } else {
      return (
        <Card.Title className="pb-3">
          {props.city} - {props.country}
        </Card.Title>
      );
    }
  } else {
    if (props.date) {
      return <div>{moment.unix(props.date).format("ddd Do")} </div>;
    } else if (props.currentHome) {
      return <div>Current</div>;
    } else {
      return (
        <div>
          {props.city} - {props.country}
        </div>
      );
    }
  }
}

function fullWeatherInfo(props, rain, temp, weatherType, weatherIcon) {
  return (
    <>
      <div className="card-details-text">
        <div>
          <Card.Subtitle>Weather</Card.Subtitle>
          <Card.Text className="card-details-border">
            {weatherType}
            <span className="d-block">{rain ? "Rain: " + rain + "mm" : "Rain: 0 mm"}</span>
            <span className="d-block">Clouds: {props.cloudCover}%</span>
          </Card.Text>
        </div>
        <div>
          <Card.Subtitle>Temp.</Card.Subtitle>
          <Card.Text className="card-details-border">
            <span className="card-temperatur">{temp}</span>
            <span className="d-block">Humidity: {props.humidity}%</span>
            {!props.minTemp ? `Feels like: ${parseInt(props.feelsLike - 273.15)}°C` : ""}
          </Card.Text>
        </div>
        <div>
          <Card.Subtitle>Wind</Card.Subtitle>
          <Card.Text className="card-details-border">
            <span className="d-block">{props.windSpeed} m/s</span> <i className="fas fa-long-arrow-alt-up fa-lg" style={{ transform: `rotate(${props.windDirection * 2}deg)` }}></i>
          </Card.Text>
        </div>
        {window.innerWidth > 700 ? <img className="weatherImg" src={weatherIcon} alt={props.weatherType} /> : ""}
      </div>
    </>
  );
}
