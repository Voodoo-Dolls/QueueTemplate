"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Icons
// Json
import maps from "@/app/json/maps";
import recordMaps from "@/app/json/recordMaps";
import recordCycles from "@/app/json/recordCycles";

// Components
import MarkdownComponent from "../Markdown/Markdown";
import Map from "./Map";
import Category from "./Category";
import SpawnCycle from "./SpawnCycle";
import MaxMonsters from "./MaxMonsters";
import ZedType from "./ZedType";
import StartTime from "./StartTime";
import CopyToClipboard from "./CopyToClipboard";

const Form = () => {
  // STATE
  // Used for the Markdown Template
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
    password: "Fetching Password...",
  });
  // Used as a precursor before query and includes error message
  const [isValid, setIsValid] = useState({
    valid: false,
    mm: "",
    map: "",
    cycle: "",
  });
  const [record, setRecord] = useState("");
  // GET WHITELIST
  useEffect(() => {
    const getWhitelist = async () => {
      const res = await fetch("/api/whitelist");
      const password = await res.json();
      if (!res.ok) {
        return "Failed";
      }
      return password[0].value;
    };
    getWhitelist().then((password) => {
      setSettings((prev) => {
        return {
          ...prev,
          password: password,
        };
      });
    });
  }, []);

  // VERIFY RECORD
  useEffect(() => {
    // Checks if certain parameter is legit, if it is reset error message.
    const handleValid = () => {
      setRecord("");
      let valid = true;

      // Max Monsters Checks if mm is above 40 OR divisible by 8
      if (parseInt(settings.mm) < 40 || parseInt(settings.mm) % 8 !== 0) {
        // console.log("Max Monster is invalid");
        valid = false;
        setIsValid((prev) => {
          return {
            ...prev,
            mm: "Max Monsters must be greater 40 and divisible by 8",
          };
        });
      } else {
        setIsValid((prev) => {
          return {
            ...prev,
            mm: "",
          };
        });
      }
      // Map Checks if Map is in included in the record Maps
      if (!recordMaps.includes(settings.map.name)) {
        valid = false;
        setIsValid((prev) => {
          return {
            ...prev,
            map: `${settings.map.name} is not a record map.`,
          };
        });
      } else {
        setIsValid((prev) => {
          return {
            ...prev,
            map: "",
          };
        });
      }
      // Cycle Checks if cycle is included in the record Cycles
      if (!recordCycles.includes(settings.cycle)) {
        valid = false;
        setIsValid((prev) => {
          return {
            ...prev,
            cycle: `${settings.cycle} is not a valid cycle`,
          };
        });
      } else {
        setIsValid((prev) => {
          return {
            ...prev,
            cycle: "",
          };
        });
      }
      // If all checks pass, update state
      if (valid) {
        setIsValid((prev) => {
          return {
            ...prev,
            valid: true,
          };
        });
      } else {
        setIsValid((prev) => {
          return {
            ...prev,
            valid: false,
          };
        });
      }
    };
    const handleValues = () => {
      let map = settings.map.name;
      let cat = settings.category.substring(1).trim();
      let sc = settings.cycle;
      let mm = settings.mm;
      let zt;

      switch (settings.zedType) {
        case "Vanilla":
          zt = 0;
          break;
        case "Anomaly":
          zt = 1;
          break;
        case "Apex":
          zt = 2;
          break;
        case "Infernal":
          zt = 3;
          break;
      }
      return {
        map: map,
        cat: cat,
        sc: sc,
        mm: mm,
        zt: zt,
      };
    };
    const getRecord = async () => {
      let params = handleValues();
      const { map, cat, sc, mm, zt } = params;
      const res = await fetch(
        `/api/records?map=${map}&cat=${cat}&sc=${sc}&mm=${mm}&zt=${zt}`
      );
      const record = await res.json();
      if (!res.ok) {
        return "Failed";
      }
      console.log(record);
      return record;
    };

    handleValid();

    // if (isValid.valid) {
    //   getRecord().then((record) => {
    //     if (record.length === 1) {
    //       setRecord(<h1>EXISTING RECORD FOUND</h1>);
    //     } else {
    //       setRecord(<h1>THIS IS A NEW RECORD</h1>);
    //     }
    //   });
    // }
  }, [settings]);

  // TEMPLATE FILE
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

  // FORM HANDLERS

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
  const handleRandom = () => {
    let randomNumber = Math.floor(Math.random() * (maps.length - 1) + 1);
    setSettings((prev) => {
      return {
        ...prev,
        map: maps[randomNumber],
      };
    });
    return randomNumber;
  };

  // COMPONENT
  return (
    <>
      <div className="container mx-auto lg:flex gap-4 p-4 relative justify-between">
        <div className="relative z-0 lg:w-1/2 mb-5 group flex flex-col gap-4 lg:max-w-[600px]">
          <h2 className="font-bold text-2xl">Queue Template</h2>
          {/* Map & Random Button */}
          <Map
            handleFormChange={handleFormChange}
            handleRandom={handleRandom}
          />
          {/* Category + Spawn Cycle */}
          <div className="md:flex gap-4">
            <Category handleFormChange={handleFormChange} />
            <SpawnCycle handleFormChange={handleFormChange} />
          </div>
          {/* Max Monsters  + Zed Type*/}
          <div className="md:flex gap-4">
            <MaxMonsters
              handleFormChange={handleFormChange}
              settings={settings}
            />
            <ZedType handleFormChange={handleFormChange} />
          </div>
          {/* Start Time + Server */}
          <div>
            <StartTime
              handleFormChange={handleFormChange}
              settings={settings}
            />
            {/* INSERT SERVER LIST EVENTUALLY  */}
          </div>
          <CopyToClipboard settings={settings} markdown={markdown} />
          <div>
            <h2 className="text-3xl font-bold mb-4">👋 Hi There</h2>
            <p className="mb-4">
              Thanks for trying out my tool. I'm currently still working on the
              map list. If you know the map name or have suggestions please DM
              Voodoo Doll on discord.
            </p>

            {/* RECORD DISPLAY */}
            {isValid.valid ? record : <p>Settings Not Valid</p>}
            <div className="w-full p-4 bg-neutral-600">
              {isValid.mm && <p>{isValid.mm}</p>}
              {isValid.map && <p>{isValid.map}</p>}
              {isValid.cycle && <p>{isValid.cycle}</p>}
            </div>
            <p>Settings are {isValid.valid ? "Valid" : "Invalid"}</p>
            <p>Category: {settings.category.split(1)}</p>
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
