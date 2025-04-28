"use client";
import { Textarea } from "@/components/ui/textarea";
import SendIcon from "@/public/assets/send-icon.svg";
import Image from "next/image";
import { SUGGESTIONS } from "@/data/searchbar-suggestions";
import { Paperclip as PaperclipIcon } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col items-end  py-4 justify-center dark:bg-input rounded-lg p-3">
        <Textarea
          className="w-full font-light resize-none px-3 max-h-[250px] overflow-y-auto origin-top"
          placeholder="Describe your idea.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="self-end flex gap-x-4 items-center">
          <button
            className="hover:brightness-80 active:brightness-90 cursor-pointer"
            aria-label="attach file"
          >
            <PaperclipIcon width={20} height={20} />
          </button>
          <button
            className="bg-button-background rounded-full p-2 cursor-pointer hover:brightness-80 active:brightness-90"
            aria-label="send message"
          >
            <Image width={18} height={18} src={SendIcon} alt="send icon" />
          </button>
        </div>
      </div>

      <div className="dark:bg-input px-6 py-4 rounded-lg ">
        <p className="font-light text-muted-foreground text-base">
          Not sure what to write? Try one of these:
        </p>
        <div className="flex flex-wrap gap-2 py-2">
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setQuery(suggestion)}
              className="bg-card cursor-pointer hover:brightness-110 px-3 py-2 text-xs rounded-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
