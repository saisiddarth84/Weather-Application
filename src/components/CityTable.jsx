import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";

function CityTable() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [start, setStart] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://public.opendatasoft.com/api/records/1.0/search/?rows=40&disjunctive.cou_name_en=true&sort=name&start=${start}&fields=geoname_id,name,cou_name_en,ascii_name,alternate_names,population,dem,timezone,country_code,coordinates&dataset=geonames-all-cities-with-a-population-1000&timezone=Asia%2FKolkata&lang=en`
        );
        const cityData = response.data.records.map((record) => ({
          cityName: record.fields.name,
          country: record.fields.cou_name_en,
          timezone: record.fields.timezone,
        }));
        setCities((prevCities) => [...prevCities, ...cityData]);
        setLoading(false);
        if (response.data.records.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [start]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    const bottomMargin = 100;

    if (scrollHeight - scrollTop - clientHeight < bottomMargin && hasMore) {
      setStart((prevStart) => prevStart + 40);
    }
  };

  const handleChange = (event, { newValue }) => {
    setSearchQuery(newValue);
    if(event.target.value === ''){
      setSelectedCity(null)
    }
  };

  const handleSuggestionsFetchRequested = async ({ value }) => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?rows=10&q=${value}&dataset=geonames-all-cities-with-a-population-1000&timezone=Asia%2FKolkata&lang=en`
      );
      const cityData = response.data.records.map((record) => ({
        cityName: record.fields.name,
        country: record.fields.cou_name_en,
        timezone: record.fields.timezone,
      }));
      setSuggestions(cityData);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => (
    <div
      className="flex flex-col gap-y-4 cursor-pointer"
      onClick={() => handleSuggestionSelected(suggestion)}
    >
      {suggestion.cityName}
    </div>
  );

  const handleSuggestionSelected = (suggestion) => {
    // Set the selected city when a suggestion is clicked
    setSelectedCity(suggestion);
  };

  const inputProps = {
    placeholder: "Search for a city...",
    value: searchQuery,
    onChange: handleChange,
    className: "border-2 border-gray-200 p-2 w-96",
  };

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto h-800px shadow overflow-hidden rounded border-b border-gray-200"
      onScroll={handleScroll}
      style={{ maxHeight: "800px" }}
    >
      <h1 className="text-2xl font-semibold my-8">My Whether Application</h1>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.cityName}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <table className="min-w-full bg-white my-8">
        <thead className="bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3  text-center text-xs font-medium text-white uppercase tracking-wider"
            >
              City Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium  text-white  uppercase tracking-wider"
            >
              Country
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium  text-white  uppercase tracking-wider"
            >
              Timezone
            </th>
          </tr>
        </thead>
        {selectedCity ? (
          <tbody>
            <tr className="bg-white">
              <td className="px-6 py-4 whitespace-nowrap">
                {selectedCity.cityName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {selectedCity.country}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {selectedCity.timezone}
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
          {cities.map((city, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-4 whitespace-nowrap">{city.cityName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{city.country}</td>
              <td className="px-6 py-4 whitespace-nowrap">{city.timezone}</td>
            </tr>
          ))}
        </tbody>
        )}
      </table>
      {loading && <div className="text-center py-4">Loading...</div>}
      {!loading && hasMore && !selectedCity && (
        <div className="text-center py-4">Loading more cities...</div>
      )}
      {!loading && !hasMore && (
        <div className="text-center py-4">No more cities to load</div>
      )}
    </div>
  );
}

export default CityTable;
