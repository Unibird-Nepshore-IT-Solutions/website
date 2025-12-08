import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

import type { Language } from "@/i18n/ui";
import { getRouteFromUrl } from "@/i18n/utils";

import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavItems {
  path: string;
  label: string;
}

interface MobileNavProps {
  url: URL;
  lang: Language;
  navItems: NavItems[];
}

export const MobileNav = ({ url, lang, navItems }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    setActiveSection(hash || "home");

    const handleSectionChange = (e: CustomEvent<{ sectionId: string }>) => {
      setActiveSection(e.detail.sectionId);
    };

    window.addEventListener(
      "sectionchange",
      handleSectionChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "sectionchange",
        handleSectionChange as EventListener
      );
    };
  }, []);

  const handleNavClick = (path: string) => {
    setActiveSection(path);
    setIsOpen(false);

    window.dispatchEvent(
      new CustomEvent("sectionchange", {
        detail: { sectionId: path },
      })
    );
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          className="flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex justify-between">
            <LanguageSwitcher currentLang={lang} route={getRouteFromUrl(url)} />
            <DrawerClose asChild>
              <button aria-label="Close menu">
                <X />
              </button>
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription asChild>
            <nav>
              <ul className="space-y-1 px-4 py-2">
                {navItems.map((item) => (
                  <li key={item.path || "home"}>
                    <a
                      href={"#" + item.path}
                      data-section={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={`block text-base text-center nav-item text-foreground hover:text-primary-dark transition-colors no-underline py-2 ${
                        lang !== "en" ? "break-keep" : "break-normal"
                      } ${
                        activeSection === item.path ? "active-nav-mobile" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
