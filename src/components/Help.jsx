import React from "react";
import { IoClose } from "react-icons/io5";

export const Help = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
        <div className="bg-black border border-white p-4 w-full max-w-[560px] flex flex-col items-center relative text-white">
            <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-gray-400">
              <IoClose size={24} /></button>
                <h3 className="text-2xl font-bold mb-4">Welcome to Skamdle!</h3>
                    <ul className="list-disc text-lg flex flex-col gap-3 pl-6">
                    <li>There are three game modes: Chardle, Clipdle, and Clipdle Unlimited.</li>
                    <li>For Chardle, you have 8 guesses to get the correct character.</li>
                    <li>For Clipdle, you have 5 guesses to get the correct SRAM episode.</li>
                    <li>Green in any column means a complete match.</li>
                    <li>Arrows next to episode numbers indicate if the correct episode is higher or lower.</li>
                    </ul>
                    <button
                onClick={onClose}
                className="mt-8 px-8 py-3 rounded-xl text-black font-extrabold text-xl"
                style={{
                backgroundColor: "#F0E400",
                fontFamily: "Barlow, sans-serif",
                }}
                >
                START
                </button>
                </div>
            </div>
  );
};