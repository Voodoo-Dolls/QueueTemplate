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
        className="border-[2px] focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center border-violet-500 text-violet-400 hover:text-white hover:bg-violet-800 hover:bg-opacity-50 flex items-center gap-2 transition-colors"
        onClick={copyImgToClipboard}
      >
        <span className="text-xl">
          <FaImage />
        </span>
        Copy Thumbnail
      </button>
      <button
        type="button"
        className="border-[2px] focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center border-violet-500 text-violet-400 hover:text-white hover:bg-violet-800 hover:bg-opacity-50 flex items-center gap-2 transition-colors"
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
