import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { FaEye } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";
import { GeneratedUrlProps } from "@/app/lib/types";

const GeneratedUrl = ({
  generatedUrl,
}: {
  generatedUrl: GeneratedUrlProps | undefined;
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyUrl = (url: string) => {
    if (!url) return;

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="flex items-center mt-3">
      <Link
        href={generatedUrl?.newUrl || "#"}
        target="_blank"
        className="truncate flex-1 text-sm text-muted-foreground text-left px-3 hover:text-black hover:underline transition"
      >
        {generatedUrl?.newUrl}
      </Link>
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopyUrl(generatedUrl?.newUrl || "")}
              >
                {copied ? (
                  <IoIosCheckmark className="size-6 text-green-500" />
                ) : (
                  <MdContentCopy className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{copied ? "Copied" : "Copy"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Link href="/analytics">
                  <FaEye className="size-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Analytics</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default GeneratedUrl;
