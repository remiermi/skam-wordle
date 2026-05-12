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
    <div className="flex flex-col items-center">
      <div className="flex border p-2 font-bold w-auto">
        <div className="w-48 text-center">SEASON</div>
        <div className="w-48 text-center">EPISODE</div>
      </div>
      <div className="grid grid-cols-2 w-full gap-2 mt-2">{listGuesses}</div>
    </div>
  );
};