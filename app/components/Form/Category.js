import category from "@/app/json/category";

const Category = ({ handleFormChange, settings }) => {
  return (
    <div className="md:w-1/3 mb-4">
      <label
        htmlFor="category"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
      >
        Select a Category
      </label>
      <select
        id="category"
        className="select cursor-pointer"
        name="category"
        onChange={(event) => handleFormChange(event)}
      >
        {category.map((category) => (
          <option
            value={category}
            key={category}
            disabled={
              settings.zedType === "Infernal" && category === "⌛ Classic"
            }
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Category;
