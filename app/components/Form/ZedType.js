const ZedType = ({ handleFormChange }) => {
  return (
    <div className="md:w-2/3">
      <label
        htmlFor="zedType"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Zed Type
      </label>
      <select
        id="category"
        className="select cursor-pointer"
        name="zedType"
        onChange={(event) => handleFormChange(event)}
      >
        <option defaultValue value="Vanilla">
          Vanilla
        </option>
        <option defaultValue value="Anomaly">
          Anomaly
        </option>
        <option defaultValue value="Apex">
          Apex
        </option>
        <option defaultValue value="Infernal">
          Infernal
        </option>
      </select>
    </div>
  );
};
export default ZedType;
