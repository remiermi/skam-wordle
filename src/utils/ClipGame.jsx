import { useEffect, useState } from "react";
import clips from "../data/clips.json";
import { SeasonEpisodeDropdown } from "../components/SeasonEpisodeDropdown";
import { ClipGuessGrid } from "../components/ClipGuessGrid";
import { ClipPlayer } from "../components/ClipPlayer";
import episodes from "../data/episodes.json";
import { ClipGameOver } from "../components/ClipGameOver";

const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86_400_000);
};

export default function ClipGame({mode="daily"}) {
  const [guesses, setGuesses] = useState([]);
  const [targetClip, setTargetClip] = useState(null);
  const [isGameOver, setGameOver] = useState(false);

  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");
  const [showGameOver, setShowGameOver] = useState(false);
  //const [dio, setDio] = useState(""); // dio necu sad ? ikad

  const maxGuesses = 5;

  useEffect(() => {
    if (mode === "daily") {
      const todaySeed = getDayOfYear();
      setTargetClip(clips[todaySeed % clips.length]);
      const saved = JSON.parse(localStorage.getItem("dailyClip") || "{}");
      if (saved.seed === todaySeed) {
        setGuesses(saved.guesses || []);
        setGameOver(true);
      }
    } else {
      const randomIndex = Math.floor(Math.random() * clips.length);
      setTargetClip(clips[randomIndex]);
    }
  }, []);

    const handleGuess = () => {
        const guessedClip = { season: Number(season), episode: Number(episode) };
        const newGuesses = [...guesses, guessedClip];
        setGuesses(newGuesses);

        if (targetClip && Number(season) === targetClip.season && Number(episode) === targetClip.episode) {
        setGameOver(true);
        setShowGameOver(true);
        if (mode === "daily") {
            localStorage.setItem("dailyClip", JSON.stringify({ seed: getDayOfYear(), guesses: newGuesses }))
        }
        // win
    } else if (newGuesses.length >= maxGuesses) {
        setGameOver(true);
        setShowGameOver(true);
        if (mode === "daily") {
            localStorage.setItem("dailyClip", JSON.stringify({ seed: getDayOfYear(), guesses: newGuesses }))
        }
    }
  }

  const targetEpisodeName = targetClip 
  ? episodes.find(e => e.season === targetClip.season && e.episode === targetClip.episode)?.name 
  : null;

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-start gap-4 px-4 py-4 overflow-x-hidden">

        {targetClip && (<ClipPlayer youtubeId={targetClip.youtubeId} />)}
        <div className="flex flex-col md:flex-row items-end gap-6 w-full max-w-[650px]">
            <SeasonEpisodeDropdown guesses={guesses} selectedSeason={season} setSelectedSeason={setSeason} selectedEpisode ={episode} setSelectedEpisode={setEpisode}
            isGameOver={isGameOver} handleGuess={handleGuess}/>
        </div>

        {<ClipGuessGrid guesses={guesses} targetClip={targetClip} />}

        {showGameOver && <ClipGameOver isGameOver={showGameOver} targetClip = {targetClip} targetClipEpisode={targetEpisodeName} onClose={() => setShowGameOver(false)}/>}
    </div>
);
}