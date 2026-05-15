import React from "react";

export const ClipGuessRow = ({ guess, targetClip }) => {
  if (!targetClip) return null;

  let isSeasonCorrect = guess.season === targetClip.season;
  let isEpisodeCorrect = guess.episode === targetClip.episode;

  let seasonClass = "";
  if (isSeasonCorrect) seasonClass="bg-green-500"
  else seasonClass="bg-gray-300"

  let episodeClass = "";
  if (isEpisodeCorrect) episodeClass="bg-green-500"
  else episodeClass="bg-gray-300"

  let episodeUpDownClass = "";
  if (guess.episode < targetClip.episode) episodeUpDownClass = "▲"
  else if (guess.episode > targetClip.episode) episodeUpDownClass = "▼";

  return (
    <div className="grid grid-cols-2 w-full">
      <div className={`${seasonClass} text-center p-3 rounded-lg m-1 text-black`}>
        {guess.season}
      </div>

      <div className={`${episodeClass} text-center p-3 rounded-lg m-1 text-black`}>
        {guess.episode} {episodeUpDownClass}
      </div>
    </div>
  );
};