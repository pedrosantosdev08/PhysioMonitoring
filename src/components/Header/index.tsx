"use client";
import { useEffect, useState } from "react";
import { MenuMobile } from "../MenuMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-around p-4 text-white h-16 md:hidden transition-all duration-300 z-40 ${
          isScrolled
            ? "bg-[#12222B]/90 backdrop-blur-md border-b border-gray-700 shadow-md"
            : "bg-[#12222B] border-b border-white"
        }`}
      >
        <div className="flex">
          <span className="font-bold text-xl">
            PhysioMonitoring <span className="text-[#2FB3AD]">&#x2022;</span>
          </span>
        </div>
        <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>

      <MenuMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
