'use client'
import { useState } from "react";
import Markdown from "react-markdown";



const MarkdownComponent = () => {
    const [title, setTitle] = useState("Hello")

    const markdown = (`
### Parameters
**\`🌎 Map:\`** Italy
**\`Record Category\`**   **::**  \`Precision\`

**\`SpawnCycle\`**   **::**asl_v3  
**\`Max Monsters\`**   **::**   
**\`ZED Type\`**   **::**   Vanilla 

**\`Start Time\`**   **::**   <t:1699488000:t>

**\`Server Info\`**
**Whitelist US**
\`open 74.91.113.4:6999?password=nkmeqi039X!6ZPH8\`
**Whitelist EU**   |  \`open 51.89.23.180:6999?password=nkmeqi039X!6ZPH8\`
**Match**   |   US #1  -  \`open 74.91.119.229:7020\`

**\` Confirmed Roster\`**
*Those who are signed up to play.*
\`\`\`md
Gwemwin
------
------
------
------
------
\`\`\`
**\` Backup Roster\`**
*Those who can tentatively join or are willing to join if someone in the main list can't make it.*
\`\`\`md
------
------
------
(add more as necessary)
\`\`\`
`
)
  return (
    <>
  <Markdown>
    {markdown}
  </Markdown>
  <button className="btn btn-outline btn-info" onClick={() => {navigator.clipboard.writeText(markdown)}}>
    Copy to Clipboard
  </button>

    </>
  )
}
export default MarkdownComponent