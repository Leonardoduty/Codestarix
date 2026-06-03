"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface CountryOption {
  flag: string;
  name: string;
  code: string;
  id: string;
}

export const COUNTRIES: CountryOption[] = [
  { flag: "🇮🇳", name: "India", code: "+91", id: "IN" },
  { flag: "🇺🇸", name: "United States", code: "+1", id: "US" },
  { flag: "🇬🇧", name: "United Kingdom", code: "+44", id: "GB" },
  { flag: "🇦🇺", name: "Australia", code: "+61", id: "AU" },
  { flag: "🇨🇦", name: "Canada", code: "+1", id: "CA" },
  { flag: "🇸🇬", name: "Singapore", code: "+65", id: "SG" },
  { flag: "🇦🇪", name: "UAE", code: "+971", id: "AE" },
  { flag: "🇩🇪", name: "Germany", code: "+49", id: "DE" },
  { flag: "🇫🇷", name: "France", code: "+33", id: "FR" },
  { flag: "🇧🇷", name: "Brazil", code: "+55", id: "BR" },
  { flag: "🇿🇦", name: "South Africa", code: "+27", id: "ZA" },
  { flag: "🇯🇵", name: "Japan", code: "+81", id: "JP" },
  { flag: "🇳🇬", name: "Nigeria", code: "+234", id: "NG" },
  { flag: "🇮🇩", name: "Indonesia", code: "+62", id: "ID" },
  { flag: "🇲🇾", name: "Malaysia", code: "+60", id: "MY" },
];

interface CountryCodeSelectProps {
  selected: string;
  onChange: (code: string) => void;
}

export default function CountryCodeSelect({ selected, onChange }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedCountry = COUNTRIES.find((c) => c.code === selected) || COUNTRIES[0];

  const handleToggle = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If space below is less than 260px, open upward
      if (spaceBelow < 260) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex-shrink-0">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-1.5 px-4 py-3.5 text-xs md:text-sm text-pulsar-lavender font-mono focus:outline-none transition-all duration-300 cursor-pointer hover:bg-white/[0.03] select-none h-full rounded-l-xl"
      >
        <span className="text-base select-none">{selectedCountry.flag}</span>
        <span>{selectedCountry.code}</span>
        <ChevronDown
          size={12}
          className={`text-on-surface-variant/40 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: openUpward ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: openUpward ? 10 : -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(167, 139, 250, 0.25)",
            }}
            className={`absolute ${
              openUpward ? "bottom-full mb-2" : "top-full mt-2"
            } left-0 w-64 max-h-[240px] rounded-xl overflow-y-auto z-[999] shadow-2xl p-1.5 scrollbar-thin scrollbar-thumb-white/10`}
          >
            {COUNTRIES.map((c) => {
              const isSelected = c.code === selected;
              return (
                <button
                  key={c.id + c.code}
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left text-xs md:text-sm font-sans transition-all duration-200 hover:bg-white/[0.04] ${
                    isSelected
                      ? "text-pulsar-lavender bg-pulsar-lavender/10 font-semibold"
                      : "text-on-surface-variant hover:text-starlight-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base select-none">{c.flag}</span>
                    <span className="truncate max-w-[120px]">{c.name}</span>
                  </div>
                  <span className="font-mono text-xs opacity-80">{c.code}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
