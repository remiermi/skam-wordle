import React from "react";
import { IoClose } from "react-icons/io5";

export const CharGameOver = ({ isGameOver, targetCharacter, onClose }) => {
  if (!isGameOver || !targetCharacter) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="bg-black border border-white p-4 w-full max-w-[560px] flex flex-col items-center relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-gray-400">
          <IoClose size={24} />
        </button>
        <div className="text-center mb-2 font-bold">GAME OVER</div>
        <div className="text-center mb-4 font-bold">
          THE CHARACTER WAS: {targetCharacter.name}
        </div>
      </div>
    </div>
  );
};