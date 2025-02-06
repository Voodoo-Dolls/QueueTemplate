import Link from "next/link";
const StartTime = ({ handleFormChange, settings }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="startTime"
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-2"
      >
        Start Time
        <Link
          href="https://hammertime.cyou/"
          target="_blank"
          className="underline"
        >
          (Supports Hammer Time)
        </Link>
      </label>
      <input
        type="text"
        name="startTime"
        id="startTime"
        value={settings.startTime}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event) => handleFormChange(event)}
      />
    </div>
  );
};
export default StartTime;
