import React from "react";
import {IoClose} from "react-icons/io5"

export const ClipGameOver = ({ isGameOver, targetClip, targetClipEpisode, onClose }) => {
  if (!isGameOver || !targetClip) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="bg-black border border-white p-4 w-full max-w-[560px] flex flex-col items-center relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-gray-400">
          <IoClose size={24} />
        </button>
        <div className="text-center mb-2 font-bold">GAME OVER</div>

        <div className="text-center mb-4 font-bold">
          THE EPISODE WAS: S{targetClip.season}E{targetClip.episode}:{" "}
          {targetClipEpisode}
        </div>

        <div className="text-center mb-4 font-bold">WATCH THE CLIP HERE:</div>

        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${targetClip.youtubeId}`}
          title="Episode clip"
          allowFullScreen
          className="rounded-lg"
        />
        <button style={{ backgroundColor: '#F0E400', fontFamily: 'Barlow, sans-serif', fontWeight: '800' }} 
                className="text-black px-3 py-3 rounded-lg w-32 text-center mt-5">UNLIMITED MODE</button>
      </div>
    </div>
  );
};