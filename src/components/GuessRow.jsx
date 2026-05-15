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
    <div className="flex flex-row items-center min-w-[820px] gap-3 mt-5 text-black">
        <div className={`${nameClass} w-48 text-center p-3 rounded-lg text-black`}>{guess.name}</div>
        <div className={`${countryClass} w-48 text-center p-3 rounded-lg text-black`}>{guess.country}</div>
        <div className={`${genderClass} w-48 text-center p-3 rounded-lg text-black`}>{guess.gender}</div>
        <div className={`${debutSeasonClass} w-48 text-center p-3 rounded-lg text-black`}>{guess.debut_season}</div>
    </div>
  );
};