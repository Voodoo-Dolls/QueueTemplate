"use client";
import { useState } from "react";
import MarkdownComponent from "./Markdown/Markdown";
import Link from "next/link";
import maps from "../utils/maps";
import cycles from "../utils/cycles";
import category from "../utils/category";

const Form = () => {
  const [settings, setSettings] = useState({
    map: {
      name: "Any",
      image: "https://i.imgur.com/FR5oBYW.png",
    },
    category: "🎯 Precision",
    cycle: "Any",
    mm: 48,
    zedType: "Vanilla",
    startTime: "ASAP",
    password: "YorQ&^B{1u!80+dC",
  });

  const markdown = `
# Match Parameters
**\`🌎 Map\`**   **::**   ${settings.map.name}   
**\`🏆 Record Category\`**   **::**   \`${settings.category}\`  
**\`♻️ SpawnCycle\`**   **::**   ${settings.cycle}  
**\`😈 Max Monsters\`**   **::**   ${settings.mm}      
**\`💪 ZED Type\`**   **::**   ${settings.zedType}  
**\`🕐 Start Time\`**   **::**   ${settings.startTime}
  
# Server Information  
**Match**   |   US #1 
\`\`\`md
open 74.91.119.229:7020
\`\`\`   
**Whitelist US**
\`\`\`md
open 74.91.113.4:6999?password=${settings.password}
\`\`\`
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
(add more as necessary)
\`\`\`
`;

  const handleFormChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setSettings((prev) => {
      return {
        ...prev,
        [name]: name === "map" ? JSON.parse(value) : value,
      };
    });
    // console.log(settings);
  };
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
    <>
      <div className="container mx-auto lg:flex gap-4 p-4 relative justify-between">
        <div className="relative z-0 lg:w-1/2 mb-5 group flex flex-col gap-4 lg:max-w-[600px]">
          <h2 className="font-bold text-2xl">Queue Template</h2>
          {/* Map */}
          <div>
            <label
              htmlFor="maps"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Map
            </label>
            <select
              id="maps"
              className="select cursor-pointer"
              name="map"
              onChange={(event) => handleFormChange(event)}
            >
              <option
                defaultValue
                value={
                  '{"name":"Any", "image":"https://i.imgur.com/FR5oBYW.png"}'
                }
              >
                Any
              </option>
              {maps.map((map, index) => (
                <option
                  value={`{"name":"${map.name}", "image":"${map.image}"}`}
                  key={index}
                >
                  {map.name} ({index})
                </option>
              ))}
            </select>
          </div>
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* SpawnCycle */}
          <div>
            <label
              htmlFor="cycle"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Cycle
            </label>
            <select
              id="cycle"
              className="select cursor-pointer"
              name="cycle"
              onChange={(event) => handleFormChange(event)}
            >
              <option defaultValue value="Any">
                Any
              </option>
              {cycles.map((cycle) => (
                <option value={cycle} key={cycle}>
                  {cycle}
                </option>
              ))}
            </select>
          </div>
          {/* Max Monsters */}
          <div className="">
            <label
              htmlFor="number-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Max Monsters
            </label>
            <input
              type="number"
              name="mm"
              id="number-input"
              step={4}
              value={settings.mm}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => handleFormChange(event)}
            />
          </div>
          {/* Zed Type */}
          <div>
            <label
              htmlFor="zedType"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Category
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
          {/* Start Time */}
          <div>
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
          </div>
          {/* Copy to Clip Board */}
          <div>
            <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              onClick={copyImgToClipboard}
            >
              Copy Thumbnail
            </button>
            <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              onClick={() => {
                navigator.clipboard.writeText(markdown);
              }}
            >
              Copy Template
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
          <h2 className="font-bold text-2xl mb-4">Simulated Output</h2>
          <MarkdownComponent markdown={markdown} image={settings.map.image} />
        </div>
      </div>
    </>
  );
};
export default Form;
