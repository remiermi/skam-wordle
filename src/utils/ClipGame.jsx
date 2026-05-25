import { useEffect, useState } from "react";
import clips from "../data/clips.json";
import episodes from "../data/episodes.json";
import { SeasonEpisodeDropdown } from "../components/SeasonEpisodeDropdown";
import { ClipGuessGrid } from "../components/ClipGuessGrid";
import { ClipPlayer } from "../components/ClipPlayer";
import { ClipGameOver } from "../components/ClipGameOver";

const getTodayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const DAILY_RANDOM_START = "2026-05-27";

const seededIndex = (dateKey) => {
  let seed = 0;

  for (let i = 0; i < dateKey.length; i++) {
    seed = (seed * 31 + dateKey.charCodeAt(i)) >>> 0;
  }

  seed += 0x6D2B79F5;
  seed = Math.imul(seed ^ (seed >>> 15), seed | 1);
  seed ^= seed + Math.imul(seed ^ (seed >>> 7), seed | 61);

  const random = ((seed ^ (seed >>> 14)) >>> 0) / 4294967296;

  return Math.floor(random * clips.length);
};

const getDailyIndex = () => {
  const today = getTodayKey();

  if (today < DAILY_RANDOM_START) {
    const dateNumber = Number(today.replaceAll("-", ""));
    return dateNumber % clips.length;
  }

  return seededIndex(today);
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
          date: getTodayKey(),
          guesses: finalGuesses,
        })
      );
    }
  };

  useEffect(() => {
    resetGameState();

    if (mode === "daily") {
      setTargetClip(clips[getDailyIndex()]);

      const saved = JSON.parse(localStorage.getItem("dailyClip") || "{}");

      if (saved.date === getTodayKey()) {
        const savedGuesses = saved.guesses || [];
        setGuesses(savedGuesses);

        const lastGuess = savedGuesses[savedGuesses.length - 1];
        const dailyClip = clips[getDailyIndex()];

        const isCorrect =
          lastGuess &&
          lastGuess.season === dailyClip.season &&
          lastGuess.episode === dailyClip.episode;

        const isOutOfGuesses = savedGuesses.length >= maxGuesses;

        if (isCorrect || isOutOfGuesses) {
          setGameOver(true);
          setShowGameOver(true);
        }
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

    if (mode === "daily") {
      localStorage.setItem(
        "dailyClip",
        JSON.stringify({
          date: getTodayKey(),
          guesses: newGuesses,
        })
      );
    }

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