import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Dehradun");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);
  const [time, setTime] = useState("");

  //useEffect hooks
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setTime(currentTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //Event Handlers
  const handeUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    console.log(currentUnit);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  // jsx code for representing the structure of the application's UI
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter city..."
              />
              <button onClick={(e) => handeUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            {/* bottom description - Descriptions component is rendered and passed the weather and units variables as props. */}
  
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
      <div className="smy">
        {weather && (
          <div className="date-time">
            <p>Date: {weather.date}</p>
            <p>Time: {time}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
