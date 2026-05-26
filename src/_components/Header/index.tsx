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
        className={`fixed top-0 left-0 right-0 flex items-center justify-between p-4 text-(--accent-color) h-16 md:hidden transition-all duration-300 z-40 ${
          isScrolled
            ? "bg-(--bg-color)/90 backdrop-blur-md border-b border-gray-700 shadow-md"
            : "bg-(--bg-color) border-b border-gray-700"
        }`}
      >
        <div className="flex">
          <span className="font-bold text-xl">
            PhysioMonitoring <span className="text-(--accent-color)">&#x2022;</span>
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
