const MaxMonsters = ({ handleFormChange, settings }) => {
  return (
    <div className="mb-4 md:w-1/3">
      <label
        htmlFor="number-input"
        className="block mb-2 text-sm font-medium text-gray-900 text-white"
      >
        Max Monsters
      </label>
      <input
        type="number"
        name="mm"
        id="number-input"
        step={8}
        value={settings.mm}
        className="select"
        onChange={(event) => handleFormChange(event)}
      />
    </div>
  );
};
export default MaxMonsters;
