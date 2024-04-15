import React, { useEffect, useState } from "react";
import Units from "./Units";
import TimeAndLocation from "./TimeAndLocation";
import TemperatureAndDetails from "./TemperatureAndDetails";
import getFormattedWeatherData from "../services/weatherService";
import { useParams } from "react-router-dom";

function WeatherInfo() {
  const {cityName} = useParams()
  console.log(cityName)
  const [query] = useState({ q: cityName });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-2 px-32 bg-gradient-to-br from-cyan-100 to-blue-100 h-fit shadow-xl shadow-gray-400">
      <div className="ml-96">  
      <Units units={units} setUnits={setUnits} />

      </div>

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

        
        </div>
      )}
    </div>
  );
}

export default WeatherInfo;
