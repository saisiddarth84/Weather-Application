import React from "react";

function Units({units, setUnits}) {
  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      const prevButton = document.querySelector(`button[name="${units}"]`);
      if (prevButton) {
        prevButton.classList.remove('scale-125');
      }
      e.currentTarget.classList.add('scale-125');
      setUnits(selectedUnit);
    }
  };

  return (
    <div className="flex flex-row justify-end my-6">
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          onClick={handleUnitsChange}
          name="metric"
          className={`text-xl text-gray-800 font-semibold ${units === 'metric' ? 'scale-125' : ''}`}
        >
          °C
        </button>
        <p className="text-xl text-gray-800 font-light mx-1">|</p>
        <button
          onClick={handleUnitsChange}
          name="imperial"
          className={`text-xl text-gray-800 font-semibold ${units === 'imperial' ? 'scale-125' : ''}`}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Units;
