import React from "react";
import { GuessRow } from "./GuessRow";

export const GuessGrid = ({ guesses, targetCharacter }) => {
  const listGuesses = guesses.map((guess) => {
    return (
      <GuessRow
        guess={guess}
        targetCharacter={targetCharacter}
        key={guess.id}
      />
    );
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[820px] flex flex-col items-center mt-8 px-4">
      <div className="flex border p-2 font-bold">
        <div className="w-48 text-center">NAME</div>
        <div className="w-48 text-center">COUNTRY</div>
        <div className="w-48 text-center">GENDER</div>
        <div className="w-48 text-center">DEBUT SEASON</div>
      </div>
      <div>{listGuesses}</div>
    </div>
    </div>
  );
};