"use client";
import { useState } from "react";
import { MenuMobile } from "../MenuMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className=" flex items-center justify-around p-4 bg-[#12222B] text-white border-b border-white h-16 md:hidden">
      <div className="flex">
        <span className="font-bold text-xl">
          PhysioMonitoring <span className="text-[#2FB3AD]">&#x2022;</span>
        </span>
      </div>
      <button className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <MenuMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}