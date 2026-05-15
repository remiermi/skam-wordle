import React from "react";
import { ClipGuessRow } from "./ClipGuessRow";

export const ClipGuessGrid = ({ guesses, targetClip }) => {
  const listGuesses = guesses.map((guess, index) => {
    return (
      <ClipGuessRow
        guess={guess}
        targetClip={targetClip}
        key={`${guess.season}-${guess.episode}-${index}`}
      />
    );
  });

  return (
  <div className="flex flex-col items-center w-full px-4">
    <div className="grid grid-cols-2 border p-2 mb-2 font-bold w-full max-w-[560px]">
      <div className="text-center">SEASON</div>
      <div className="text-center">EPISODE</div>
    </div>

    <div className="w-full max-w-[560px]">
      {listGuesses}
    </div>
  </div>
);
};