import { useEffect, useState } from "react";
import characters from "../data/characters.json";
import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";
import { GuessGrid } from "../components/GuessGrid";
import { CharGameOver } from "../components/CharGameOver";

const getTodayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const getDailyIndex = () => {
  const dateNumber = Number(getTodayKey().replaceAll("-", ""));
  return dateNumber % characters.length;
};

export default function Game() {
  const [guesses, setGuesses] = useState([]);
  const [results, setResults] = useState([]);
  const [targetCharacter, setTargetCharacter] = useState(null);
  const [isGameOver, setGameOver] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [input, setInput] = useState("");

  const maxGuesses = 8;

  useEffect(() => {
    const dailyCharacter = characters[getDailyIndex()];
    setTargetCharacter(dailyCharacter);

    const saved = JSON.parse(localStorage.getItem("dailyChar") || "{}");

    if (saved.date === getTodayKey()) {
      const savedGuesses = saved.guesses || [];
      setGuesses(savedGuesses);

      const lastGuess = savedGuesses[savedGuesses.length - 1];

      const isCorrect = lastGuess && lastGuess.id === dailyCharacter.id;
      const isOutOfGuesses = savedGuesses.length >= maxGuesses;

      if (isCorrect || isOutOfGuesses) {
        setGameOver(true);
        setShowGameOver(false);
      }
    }
  }, []);

  const handleSelect = (character) => {
    const newGuesses = [...guesses, character];
    setGuesses(newGuesses);
    setResults([]);
    setInput("");

    localStorage.setItem(
      "dailyChar",
      JSON.stringify({ date: getTodayKey(), guesses: newGuesses })
    );

    const isCorrect = targetCharacter && character.id === targetCharacter.id;
    const isOutOfGuesses = newGuesses.length >= maxGuesses;

    if (isCorrect || isOutOfGuesses) {
      setGameOver(true);
      setShowGameOver(true);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <SearchBar
        setResults={setResults}
        input={input}
        setInput={setInput}
        isGameOver={isGameOver}
        guesses={guesses}
      />
      <SearchResultsList results={results} onSelect={handleSelect} />
      <GuessGrid guesses={guesses} targetCharacter={targetCharacter} />

      {isGameOver && (
        <p className="text-center mt-10 font-bold text-xl">
          THE CHARACTER WAS: {targetCharacter?.name}
        </p>
      )}

      {showGameOver && (
        <CharGameOver
          isGameOver={showGameOver}
          targetCharacter={targetCharacter}
          onClose={() => setShowGameOver(false)}
        />
      )}
    </div>
  );
}