import { useEffect, useState } from "react";
import characters from "../data/characters.json";
import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";
import { GuessGrid } from "../components/GuessGrid";
import { CharGameOver } from "../components/CharGameOver";

const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86_400_000);
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
    const todaySeed = getDayOfYear();
    setTargetCharacter(characters[todaySeed % characters.length]);

    const saved = JSON.parse(localStorage.getItem("dailyChar") || "{}");
    if (saved.seed === todaySeed) {
      setGuesses(saved.guesses || []);
      setGameOver(true);
      setShowGameOver(false); // ne otvara modal na refresh
    }
  }, []);

  const handleSelect = (character) => {
    const newGuesses = [...guesses, character];
    setGuesses(newGuesses);
    setResults([]);
    setInput("");

    const isCorrect = targetCharacter && character.id === targetCharacter.id;
    const isOutOfGuesses = newGuesses.length >= maxGuesses;

    if (isCorrect || isOutOfGuesses) {
      setGameOver(true);
      setShowGameOver(true);
      localStorage.setItem(
        "dailyChar",
        JSON.stringify({ seed: getDayOfYear(), guesses: newGuesses })
      );
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