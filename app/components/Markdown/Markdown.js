'use client'
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'



const MarkdownComponent = () => {
    const [title, setTitle] = useState("Hello")

    const copyImgToClipboard = async (animal)=> {
        const URL = `https://www.js-craft.io/_public-files/img-cat.png`
        console.log('test')
        try {
            const copiedImage = await fetch(URL)
            const blobData = await copiedImage.blob()
            const clipboardItemInput = new ClipboardItem({'image/png' : blobData})
            navigator.clipboard.write([clipboardItemInput])
        } catch(e) {
            console.log(e)
        }
    }

    const markdown = (`
### Parameters
**\`🌎 Map:\` Italy
**\`🏆 Record Category:\` 🎯 Precision
**\`♻️ SpawnCycle:\`** asl_v3  
**\`😈 Max Monsters:\`** 64
**\`💪 ZED Type:\`** Vanilla
**\`Start Time\`**   **::**   <t:1699488000:t>
### Whitelist US (Click to Copy)
\`\`\`md
open 74.91.113.4:6999?password=nkmeqi039X!6ZPH8
\`\`\`
### Server (Click to Copy)
\`\`\`md
open 74.91.119.229:7020
\`\`\`
### Players
\`\`\`md
Gwemwin
------
------
------
------
------
\`\`\`
### Backup
\`\`\`md
------
------
------
\`\`\`
`
)
  return (
    <>
  <Markdown remarkPlugins={[remarkGfm]}>
    {markdown}
  </Markdown>
  <button className="btn btn-outline btn-info" onClick={() => {navigator.clipboard.writeText(markdown)}}>
    Copy to Clipboard
  </button>
  <button className="btn btn-outline btn-info" onClick={copyImgToClipboard}>
    Copy to Image
  </button>
    </>
  )
}
export default MarkdownComponent