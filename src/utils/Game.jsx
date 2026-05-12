import { useEffect, useState } from "react";
import characters from "../data/characters.json";
import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";
import { GuessGrid } from "../components/GuessGrid";

export default function Game(){

    const [guesses, setGuesses] = useState([]);
    const [results, setResults] = useState([]);
    const [targetCharacter, setTargetCharacter] = useState(null);
    const [isGameOver, setGameOver] = useState(false);
    const [input, setInput] = useState("");

    const maxGuesses = 8;
    
    // random character from characters.json
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomCharacter = characters[randomIndex];
        setTargetCharacter(randomCharacter);
    }, []);

    // 
    const handleSelect = (character) => {
        const newGuesses = [...guesses, character];
        setGuesses(newGuesses);
        // makni dropdown 
        setResults([]);
        setInput("");

    if (targetCharacter && character.id === targetCharacter.id){
        setGameOver(true);
        // win komponenta
    } else if (newGuesses.length === maxGuesses){
        setGameOver(true);
    }
  }
  return (
    <div className="bg-black min-h-screen text-white">
      <SearchBar setResults={setResults} input={input} setInput={setInput} isGameOver={isGameOver} guesses={guesses}/>

      <SearchResultsList results={results} onSelect={handleSelect}/>

      {<GuessGrid guesses={guesses} targetCharacter={targetCharacter} />}

      {isGameOver && <p class="text-center mt-10">Game over, the character was {targetCharacter.name}</p>}
    </div>
  );

}