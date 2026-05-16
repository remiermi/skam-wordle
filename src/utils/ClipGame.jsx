import { useEffect, useState } from "react";
import clips from "../data/clips.json";
import episodes from "../data/episodes.json";
import { SeasonEpisodeDropdown } from "../components/SeasonEpisodeDropdown";
import { ClipGuessGrid } from "../components/ClipGuessGrid";
import { ClipPlayer } from "../components/ClipPlayer";
import { ClipGameOver } from "../components/ClipGameOver";
import { Link } from "react-router-dom";

const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86_400_000);
};

const getRandomClip = () => {
  const randomIndex = Math.floor(Math.random() * clips.length);
  return clips[randomIndex];
};

export default function ClipGame({ mode = "daily" }) {
  const [guesses, setGuesses] = useState([]);
  const [targetClip, setTargetClip] = useState(null);
  const [isGameOver, setGameOver] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");

  const maxGuesses = 5;

  const resetGameState = () => {
    setGuesses([]);
    setGameOver(false);
    setShowGameOver(false);
    setSeason("1");
    setEpisode("1");
  };

  const finishGame = (finalGuesses) => {
    setGameOver(true);
    setShowGameOver(true);

    if (mode === "daily") {
      localStorage.setItem(
        "dailyClip",
        JSON.stringify({
          seed: getDayOfYear(),
          guesses: finalGuesses,
        })
      );
    }
  };

  useEffect(() => {
    resetGameState();

    if (mode === "daily") {
      const todaySeed = getDayOfYear();
      setTargetClip(clips[todaySeed % clips.length]);

      const saved = JSON.parse(localStorage.getItem("dailyClip") || "{}");

      if (saved.seed === todaySeed) {
        setGuesses(saved.guesses || []);
        setGameOver(true);
        setShowGameOver(true);
      }
    } else {
      setTargetClip(getRandomClip());
    }
  }, [mode]);

  const handleGuess = () => {
    if (isGameOver || !targetClip) return;

    const guessedClip = {
      season: Number(season),
      episode: Number(episode),
    };

    const newGuesses = [...guesses, guessedClip];
    setGuesses(newGuesses);

    const isCorrect =
      guessedClip.season === targetClip.season &&
      guessedClip.episode === targetClip.episode;

    const isOutOfGuesses = newGuesses.length >= maxGuesses;

    if (isCorrect || isOutOfGuesses) {
      finishGame(newGuesses);
    }
  };

  const startNewUnlimitedGame = () => {
    resetGameState();
    setTargetClip(getRandomClip());
  };

  const targetEpisodeName = targetClip
    ? episodes.find(
        (e) =>
          e.season === targetClip.season &&
          e.episode === targetClip.episode
      )?.name
    : null;

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-start gap-4 px-4 py-4 overflow-x-hidden">
      {targetClip && <ClipPlayer youtubeId={targetClip.youtubeId} />}

      <div className="flex flex-col md:flex-row items-end gap-6 w-full max-w-[650px]">
        <SeasonEpisodeDropdown
          guesses={guesses}
          selectedSeason={season}
          setSelectedSeason={setSeason}
          selectedEpisode={episode}
          setSelectedEpisode={setEpisode}
          isGameOver={isGameOver}
          handleGuess={handleGuess}
        />
      </div>

      <ClipGuessGrid guesses={guesses} targetClip={targetClip} />
      
      {isGameOver && mode === "unlimited" && (
        <button
            onClick={startNewUnlimitedGame}
            style={{ backgroundColor: '#F0E400', fontFamily: 'Barlow, sans-serif', fontWeight: '800' }}
            className="text-black px-3 py-3 rounded-lg w-44 text-center"
        >
            PLAY AGAIN
        </button>
        )}

      {showGameOver && (
        <ClipGameOver
          isGameOver={showGameOver}
          targetClip={targetClip}
          targetClipEpisode={targetEpisodeName}
          onClose={() => setShowGameOver(false)}
          onPlayAgain={mode === "unlimited" ? startNewUnlimitedGame : undefined}
        />
      )}
    </div>
  );
}