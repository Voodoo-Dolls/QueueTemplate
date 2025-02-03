"use client";
import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownComponent = ({ markdown, image }) => {
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
          <p>{image}</p>
          <Markdown>{markdown}</Markdown>
        </div>
      </div>
    </>
  );
};
export default MarkdownComponent;
