import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

interface MenuMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuMobile({ isOpen, onClose }: MenuMobileProps) {
  return (
    <>
      {/* Overlay escuro atrás do menu */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}
      

      <nav
        className={`fixed top-0 right-0 h-full w-[70%] max-w-xs bg-[#12222B] text-white z-60
          flex flex-col justify-between py-10 px-6 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Topo: logo + botão fechar */}
        <div>
          <div className="flex items-center justify-between mb-10 z-60">
            <span className="font-bold text-lg">
              PhysioMonitoring <span className="text-[#2FB3AD]">&#x2022;</span>
            </span>
            <button
              onClick={onClose}
              className="text-white hover:text-[#2FB3AD] transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
          </div>

          {/* Links */}
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium
                  hover:bg-[#2FB3AD]/20 hover:text-[#2FB3AD] transition-all duration-200"
              >
                Entrar
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium
                  hover:bg-[#2FB3AD]/20 hover:text-[#2FB3AD] transition-all duration-200"
              >
                Cadastrar
              </Link>
            </li>
          </ul>

        </div>

        {/* Rodapé do menu */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
        <ThemeToggle />
          <p className="text-xs text-white/40 text-center">
            © 2024 PhysioMonitoring
          </p>
        </div>
      </nav>
    </>
  );
}