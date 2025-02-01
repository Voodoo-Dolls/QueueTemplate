"use client";
import { useState } from "react";
import MarkdownComponent from "./Markdown/Markdown";

const Form = () => {
  const [title, setTitle] = useState("");
  const [map, setMap] = useState("");
  const [category, setCategory] = useState("");
  const [mm, setMM] = useState("");
  const [zedType, setZedType] = useState("Vanilla");
  const [whiteList, setWhiteList] = useState("");
  const [server, setServer] = useState("7020");

  return (
    <>
      <div className="container mx-auto lg:flex gap-4 p-4">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            className="peer"
            placeholder=""
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title">Queue Title</label>
        </div>

        <div className="lg:w-1/2">
          <h2 className="font-bold text-2xl">Rendered Output</h2>
          <MarkdownComponent />
        </div>
      </div>
      {/* Debug */}
      <div className="container mx-auto">
        <h1>DEBUG</h1>
        <p>Title: {title}</p>
        <p>Map: {map}</p>
        <p>Category: {category}</p>
        <p>Max Monsters: {mm}</p>
        <p>ZedType: {zedType}</p>
        <p>whiteList: {whiteList}</p>
        <p>server: {server}</p>
      </div>
    </>
  );
};
export default Form;
