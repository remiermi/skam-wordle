import React from "react";
import characters from "../data/characters.json";

export const SearchBar = ({setResults, input, setInput, isGameOver, guesses}) => {

  const fetchData = (value) => {
    const results = characters.filter((character) => {
       const alreadyGuessed = guesses.some(
        (guess) => guess.id === character.id
      );
      return (!alreadyGuessed && value && character && 
        character.name && character.name.toLowerCase().includes(value.toLowerCase()));
    });

    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value)
    fetchData(value)
  }

  return (
    <div className="flex justify-center mt-10">
      <input
        className="rounded-sm border border-white px-4 py-2 w-80"
        placeholder="Type a character..." value={input} disabled={isGameOver} onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};