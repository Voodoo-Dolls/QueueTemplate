"use client";
import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownComponent = ({ markdown, image }) => {
  const copyImgToClipboard = async () => {
    const URL = image;
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

  return (
    <>
      <div className="flex gap-5">
        {/* PROFILE */}
        <div className="hidden lg:block">
          <Image
            src="/profile.webp"
            height={48}
            width={48}
            alt="Voodoo Doll's Profile Icon"
            className="rounded-full w-[48px] h-[48px] max-w-32"
          />
        </div>

        <div className="markdown w-full">
          <div className="hidden lg:block">
            <h3 className="mb-1">
              <span className="mr-[0.5rem]">Voodoo Doll</span>
              <span className="text-[0.75rem] muted">Today at 10:30 AM</span>
            </h3>
          </div>
          <Image
            src={image}
            width={512}
            height={208}
            sizes="100vw"
            className="h-auto w-full rounded-md"
            alt=""
          />
          <Markdown>{markdown}</Markdown>
        </div>
      </div>

      <button className="btn btn-outline btn-info" onClick={copyImgToClipboard}>
        Copy to Image
      </button>
    </>
  );
};
export default MarkdownComponent;
