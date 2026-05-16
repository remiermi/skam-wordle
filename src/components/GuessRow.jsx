import React from "react";

export const GuessRow = ({ guess, targetCharacter }) => {
  if (!targetCharacter) return null;

  let isNameCorrect = guess.name === targetCharacter.name;
  let isCountryCorrect = guess.country === targetCharacter.country;
  let isGenderCorrect = guess.gender === targetCharacter.gender;
  let isDebutSeasonCorrect = guess.debut_season === targetCharacter.debut_season;

  let nameClass = "";
  if (isNameCorrect) nameClass="bg-green-500"
  else nameClass="bg-gray-300"

  let countryClass = "";
  if (isCountryCorrect) countryClass="bg-green-500"
  else countryClass="bg-gray-300"

  let genderClass = "";
  if (isGenderCorrect) genderClass="bg-green-500"
  else genderClass="bg-gray-300"

  let debutSeasonClass = "";
  if (isDebutSeasonCorrect) debutSeasonClass="bg-green-500"
  else debutSeasonClass="bg-gray-300"

  return (
    <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-1 mt-2 text-black text-[10px] md:text-base">
        <div className={`${nameClass} text-center p-3 rounded-lg text-black`}>{guess.name}</div>
        <div className={`${countryClass} text-center p-3 rounded-lg text-black`}>{guess.country}</div>
        <div className={`${genderClass} text-center p-3 rounded-lg text-black`}>{guess.gender}</div>
        <div className={`${debutSeasonClass} text-center p-3 rounded-lg text-black`}>{guess.debut_season}</div>
    </div>
  );
};