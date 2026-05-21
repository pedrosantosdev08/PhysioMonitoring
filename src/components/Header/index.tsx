"use client";
import { useState } from "react";
import { MenuMobile } from "../MenuMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-[#12222B] text-white border-b border-white">
      <div className="flex">
        <span className="font-bold text-xl">
          PhysioMonitoring <span className="text-[#2FB3AD]">&#x2022;</span>
        </span>
      </div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <MenuMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}