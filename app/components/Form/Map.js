import maps from "@/app/json/maps";
import { FaDice } from "react-icons/fa";
const Map = ({ handleFormChange, handleRandom }) => {
  return (
    <div className="flex gap-4 justify-between">
      <div className="flex-grow">
        <label
          htmlFor="maps"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
        >
          Select a Map
        </label>
        <select
          id="maps"
          className="select cursor-pointer"
          name="map"
          onChange={(event) => handleFormChange(event)}
        >
          <option
            defaultValue
            value={'{"name":"Any", "image":"https://i.imgur.com/FR5oBYW.png"}'}
          >
            Any
          </option>
          {maps.map((map, index) => (
            <option
              value={`{"name":"${map.name}", "image":"${map.image}"}`}
              key={index}
            >
              {map.name} ({index})
            </option>
          ))}
        </select>
      </div>
      <div className="mt-auto">
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 flex items-center gap-2"
          onClick={() => {
            handleRandom();
          }}
        >
          <span className="text-xl">
            <FaDice />
          </span>
          Random Map
        </button>
      </div>
    </div>
  );
};

export default Map;
