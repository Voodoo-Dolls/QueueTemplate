import maps from "@/app/json/maps";
import { FaDice } from "react-icons/fa";
const Map = ({ handleFormChange, handleRandom }) => {
  return (
    <div className="">
      <label
        htmlFor="maps"
        className="block text-sm font-medium  text-white mb-2"
      >
        Select a Map
      </label>
      <div className="flex items-center gap-4">
        <select
          id="maps"
          className="select cursor-pointer flex-grow"
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
              className="active:bg-red-300"
            >
              {map.name} ({index})
            </option>
          ))}
        </select>

        <button
          type="button"
          className="whitespace-nowrap font-medium text-md border-violet-500 text-violet-400 hover:text-white flex items-center gap-2 transition-colors"
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
