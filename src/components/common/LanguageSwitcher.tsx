import { ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getLocalizedPath } from "@i18n/utils";
import { languages, type Language } from "@i18n/ui";

interface LanguagePopoverProps {
  currentLang: Language;
  route: string;
}

export default function LanguageSwitcher({
  currentLang,
  route,
}: LanguagePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger className="text-sm flex items-center gap-1">
        <div className="size-6 overflow-hidden rounded-md">
          <img
            alt={"Flag"}
            src={`/assets/images/${
              currentLang === "en"
                ? "US.webp"
                : currentLang === "ja"
                ? "JP.webp"
                : "NP.webp"
            }`}
            className="size-full block object-contain rounded-md"
          />
        </div>
        {languages[currentLang].split(" ").map((item, index) => (
          <span
            key={index}
            className={index === 0 ? "text-secondary-text" : ""}
          >
            {item}
          </span>
        )) || "Language"}
        <ChevronDown size={16} />
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0 bg-background">
        <div className="flex flex-col">
          {Object.entries(languages).map(([langCode, label]) => (
            <div
              key={langCode}
              className={`flex items-center gap-2 px-3 py-2 text-sm text-inherit no-underline ${
                currentLang === langCode
                  ? "font-medium bg-primary-light text-primary-foreground"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="size-6 overflow-hidden rounded-md">
                <img
                  alt={"Flag"}
                  src={`/assets/images/${
                    langCode === "en"
                      ? "US.webp"
                      : langCode === "ja"
                      ? "JP.webp"
                      : "NP.webp"
                  }`}
                  className="size-full block object-contain rounded-md"
                />
              </div>
              <a
                key={langCode}
                href={getLocalizedPath(route, langCode as any)}
                className="text-inherit no-underline flex items-center gap-1"
              >
                {label.split(" ").map((item, index) => (
                  <span
                    className={
                      index === 0 && currentLang !== langCode
                        ? "text-secondary-text"
                        : ""
                    }
                  >
                    {item}
                  </span>
                ))}
              </a>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
