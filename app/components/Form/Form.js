"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

// Icons
import { FaCheck } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

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
import Spinner from "../Spinner";

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
    map: `The Map "${settings.map.name}" is not a record map.`,
    cycle: `The Spawncycle "${settings.cycle}" is not a record cycle`,
  });
  const [record, setRecord] = useState("");
  const debouncedSearchTerm = useDebounce(isValid, 1000);
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
            map: `The Map "${settings.map.name}" is not a record map.`,
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
            cycle: `The Spawncycle "${settings.cycle}" is not a record cycle`,
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

    handleValid();
  }, [settings]);

  // GET RECORD
  useEffect(() => {
    // Formats Values for the Query
    const handleValues = () => {
      let map = settings.map.name;
      let cat = settings.category.slice(2).trim();
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
      // console.log(record);
      return record;
    };

    if (isValid.valid) {
      getRecord().then((record) => {
        if (record.length === 1) {
          setRecord(
            <div className="p-4 rounded-md border border-yellow-500 bg-yellow-500 bg-opacity-10">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span className="text-yellow-500 text-3xl">
                  <IoWarning />
                </span>
                Verified (Matching) Current Record is: "{record[0].max_monsters}
                "
              </h2>
            </div>
          );
        } else {
          setRecord(
            <div className="p-4 rounded-md border border-green-500 bg-green-500 bg-opacity-10">
              <h2 className="font-bold flex items-center gap-2">
                <span className="text-[#44FF44]">
                  <FaCheck />
                </span>
                Verified (New Record)
              </h2>
            </div>
          );
        }
      });
    }
  }, [debouncedSearchTerm]);

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
          <div className="mb-4">
            {/* RECORD DISPLAY */}

            {isValid.valid ? (
              record ? (
                // If Valid & Fetching Complete
                record
              ) : (
                // If Valid & Fetching Data
                <div className="flex gap-2 items-center p-4">
                  <Spinner />
                  <p>Fetching Data</p>
                </div>
              )
            ) : (
              // If not Valid
              <div className="p-4 border border-red-500 rounded-md bg-red-500 bg-opacity-10">
                <p className="mb-2">❌ Not Verified</p>
                <ul className="list-disc list-inside">
                  {isValid.mm && <li>{isValid.mm}</li>}
                  {isValid.map && <li>{isValid.map}</li>}
                  {isValid.cycle && <li>{isValid.cycle}</li>}
                </ul>
              </div>
            )}
          </div>
          <h2 className="text-3xl font-bold mb-4 animate-bounce">
            👋 Hi There
          </h2>
          <p className="mb-4 text-balance">
            Thanks for trying out my tool. I'm almost done with the tool. If you
            have any feedback or encounter any bugs please DM Voodoo Doll on
            Discord.
          </p>
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
