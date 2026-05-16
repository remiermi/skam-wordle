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
    <div className="w-full max-w-[430px] md:max-w-[900px] px-1 mx-auto mt-5">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-1 border p-1 font-bold text-[10px] md:text-base">
        <div className="text-center">NAME</div>
        <div className="text-center">COUNTRY</div>
        <div className=" text-center">GENDER</div>
        <div className="text-center">DEBUT SEASON</div>
      </div>
      <div>{listGuesses}</div>
    </div>
  );
};