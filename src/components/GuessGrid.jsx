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
    <div className="flex flex-col items-center mt-8">
      <div className="flex border p-2 font-bold w-auto">
        <div className="w-48 text-center">NAME</div>
        <div className="w-48 text-center">COUNTRY</div>
        <div className="w-48 text-center">GENDER</div>
        <div className="w-48 text-center">DEBUT SEASON</div>
      </div>
      <div>{listGuesses}</div>
    </div>
  );
};