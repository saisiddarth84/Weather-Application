import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilCompressArrows,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";
import { useParams } from "react-router-dom";

function TemperatureAndDetails({
  weather
}) {
  const  {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    pressure
  } = weather;
  const { timezone, cityZone } = useParams();

  if(weather[0] === "c"){
    return <div className="text-3xl text-red-600">Oops! City not found...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-cyan-300">
        <p className="text-blue-400   font-semibold  text-4xl">{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-blue-800  mb-8 font-semibold py-3">
        <img src={iconUrlFromCode(icon)} alt="Weather icon" className="w-20 scale-150" />
        <p className="text-6xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilSun size={18} className="mr-1 " />
            Rise:
            <span className="font-medium ml-1">
              {formatToLocalTime(sunrise, timezone + "/" + cityZone, "hh:mm a")}
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilSunset size={18} className="mr-1" />
            Set:
            <span className="font-medium ml-1">
              {formatToLocalTime(sunset, timezone + "/" + cityZone, "hh:mm a")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 flex-wrap  gap-4 text-white py-3">
        <div className="flex flex-col justify-center items-center w-56 gap-2 p-4 px-12 shadow-xl rounded-lg text-2xl font-semibold  bg-blue-400">
          <div className="scale-150 mb-2">
            <UilSun />
          </div>
          <div>High</div>
          <div className="font-medium text-3xl ml-1">
            {`${temp_max.toFixed()}`}°
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-56 gap-2 p-4 px-12 shadow-xl rounded-lg text-2xl font-semibold  bg-blue-400">
          <div className="scale-150 mb-2">
            <UilSun />
          </div>
          <div>Low</div>
          <div className="font-medium text-3xl ml-1">
            {`${temp_min.toFixed()}`}°
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 w-56 p-4 px-12 shadow-xl rounded-lg text-2xl font-semibold  bg-blue-400">
          <div className="scale-150 mb-2">
            <UilWind />
          </div>
          <div>Wind</div>
          <div className="font-medium text-3xl ml-1">
            {`${speed.toFixed()}`}km/h
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 w-56 p-4 px-12 shadow-xl rounded-lg text-2xl font-semibold  bg-blue-400">
          <div className="scale-150 mb-2">
            <UilCompressArrows />
          </div>
          <div>Pressure</div>
          <div className="font-medium text-3xl ml-1">
            {`${pressure.toFixed()}`}hpa
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 w-56 p-4 px-12 shadow-xl rounded-lg text-2xl font-semibold  bg-blue-400">
          <div className="scale-150 mb-2">
            <UilTemperature />
          </div>
          <div>Real fell</div>
          <div className="font-medium text-3xl ml-1">
            {`${feels_like.toFixed()}`}°
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 w-56 p-4 px-12 shadow-xl rounded-lg text-2xl font-semibold  bg-blue-400">
          <div className="scale-150 mb-2">
            <UilTear />
          </div>
          <div>Humidity</div>
          <div className="font-medium text-3xl ml-1">
            {`${humidity.toFixed()}`}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
