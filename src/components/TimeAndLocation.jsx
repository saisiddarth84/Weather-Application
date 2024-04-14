import React from "react";
import { formatToLocalTime } from "../services/weatherService";
import { useParams } from "react-router-dom";

function TimeAndLocation({weather: { name, country}}) {
  const {timezone, cityZone} = useParams();
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className=" text-gray-800   font-semibold text-xl ">
        {formatToLocalTime(Date.now() / 1000, timezone + "/" + cityZone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-gray-800  text-4xl font-medium">
          {`${name},${country}`}
        </p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
