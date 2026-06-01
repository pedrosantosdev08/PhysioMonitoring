"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ButtonLogOut() {
  return (
    <>
      <button className="bg-(--accent-color) px-4 py-2  rounded-2xl text-white font-medium border hover:bg-red-500 transition-colors">
        Sair <FontAwesomeIcon icon={faArrowRightFromBracket} className="ml-2" />
      </button>
    </>
  );
}
