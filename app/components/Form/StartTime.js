import Link from "next/link";
const StartTime = ({ handleFormChange, settings }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="startTime"
        className="mb-2 text-sm font-medium text-white flex gap-2"
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
        className="select"
        onChange={(event) => handleFormChange(event)}
      />
    </div>
  );
};
export default StartTime;
