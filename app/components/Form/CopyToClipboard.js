import { FaImage } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
const CopyToClipboard = ({ markdown, settings }) => {
  const copyImgToClipboard = async () => {
    try {
      const copiedImage = await fetch(settings.map.image);
      const blobData = await copiedImage.blob();
      const clipboardItemInput = new ClipboardItem({ "image/png": blobData });
      navigator.clipboard.write([clipboardItemInput]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex gap-4">
      <button
        type="button"
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 flex gap-2 items-center"
        onClick={copyImgToClipboard}
      >
        <span className="text-xl">
          <FaImage />
        </span>
        Copy Thumbnail
      </button>
      <button
        type="button"
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 flex items-center gap-2"
        onClick={() => {
          navigator.clipboard.writeText(markdown);
        }}
      >
        <span className="text-xl">
          <IoDocumentTextOutline />
        </span>
        Copy Template
      </button>
    </div>
  );
};
export default CopyToClipboard;
