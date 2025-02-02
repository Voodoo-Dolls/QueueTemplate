"use client";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownComponent = () => {
  const [title, setTitle] = useState("Hello");

  const copyImgToClipboard = async (animal) => {
    const URL = `https://imgur.com/FR5oBYW`;
    console.log("test");
    try {
      const copiedImage = await fetch(URL);
      const blobData = await copiedImage.blob();
      const clipboardItemInput = new ClipboardItem({ "image/png": blobData });
      navigator.clipboard.write([clipboardItemInput]);
    } catch (e) {
      console.log(e);
    }
  };

  const markdown = `
# Match Parameters
**\`🌎 Map\`**   **::**   Any
**\`🏆 Record Category\`**   **::**   \`⌛ Classic\`
**\`♻️ SpawnCycle\`**   **::**   Any
**\`😈 Max Monsters\`**   **::**   Any
**\`💪 ZED Type\`**   **::**   Vanilla
**\`🕐 Start Time\`**   **::**   In at least 30 minutes
  
# Server Information 
**Match**   |   US #1 
\`\`\`open 74.91.119.229:7020\`\`\`
**Whitelist US**      
\`\`\`open 74.91.113.4:6999?password=YorQ&^B{1u!80+dC\`\`\`
# Confirmed Roster
*Those who are signed up to play.*
\`\`\`md
------
------
------
------
------
------
\`\`\`
# Backup Roster
*Those who can tentatively join or are willing to join if someone in the main list can't make it.*
\`\`\`md
------
------
------
(add more as necessary)
\`\`\`
`;
  return (
    <>
      <div className="container p-4 flex">
        {/* PROFILE */}
        <div></div>
        {/* Message */}
        <div>
          <h1 className="mt-[8px] text-[1.5rem] font-bold">Match Paremeters</h1>
          <strong>
            <code>🌎 Map</code>
          </strong>
        </div>
      </div>
      {/* <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown> */}
      <button
        className="btn btn-outline btn-info"
        onClick={() => {
          navigator.clipboard.writeText(markdown);
        }}
      >
        Copy to Clipboard
      </button>
      <button className="btn btn-outline btn-info" onClick={copyImgToClipboard}>
        Copy to Image
      </button>
    </>
  );
};
export default MarkdownComponent;
