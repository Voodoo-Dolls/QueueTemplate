import cycles from "@/app/json/cycles";

const SpawnCycle = ({ handleFormChange }) => {
  return (
    <div className="md:w-2/3">
      <label
        htmlFor="cycle"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select a Cycle
      </label>
      <select
        id="cycle"
        className="select cursor-pointer"
        name="cycle"
        onChange={(event) => handleFormChange(event)}
      >
        <option defaultValue value="Any">
          Any
        </option>
        {cycles.map((cycle) => (
          <option value={cycle} key={cycle}>
            {cycle}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SpawnCycle;
