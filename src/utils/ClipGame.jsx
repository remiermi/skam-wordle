import { useEffect, useState } from "react";
import clips from "../data/clips.json";
import { SeasonEpisodeDropdown } from "../components/SeasonEpisodeDropdown";
import { ClipGuessGrid } from "../components/ClipGuessGrid";
import { ClipPlayer } from "../components/ClipPlayer";
import episodes from "../data/episodes.json";

export default function ClipGame() {
  const [guesses, setGuesses] = useState([]);
  const [targetClip, setTargetClip] = useState(null);
  const [isGameOver, setGameOver] = useState(false);

  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");
  //const [dio, setDio] = useState(""); // dio necu sad ? ikad

  const maxGuesses = 5;

  useEffect(() => {
        const randomIndex = Math.floor(Math.random() * clips.length);
        const randomClip = clips[randomIndex];
        setTargetClip(randomClip);
    }, []);

    const handleGuess = () => {
        const guessedClip = { season: Number(season), episode: Number(episode) };
        const newGuesses = [...guesses, guessedClip];
        setGuesses(newGuesses);

        if (targetClip && Number(season) === targetClip.season && Number(episode) === targetClip.episode) {
        setGameOver(true);
        // win
    } else if (newGuesses.length >= maxGuesses) {
        setGameOver(true);
    }
  }

  const targetEpisodeName = targetClip 
  ? episodes.find(e => e.season === targetClip.season && e.episode === targetClip.episode)?.name 
  : null;

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-start gap-6 px-4 py-6">

        {targetClip && (<ClipPlayer youtubeId={targetClip.youtubeId} />)}
        <div className="flex flex-col md:flex-row items-end gap-6 w-full max-w-[650px]">
            <SeasonEpisodeDropdown guesses={guesses} selectedSeason={season} setSelectedSeason={setSeason} selectedEpisode ={episode} setSelectedEpisode={setEpisode}/>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 w-full max-w-[650px]">
                <button style={{ backgroundColor: '#F0E400', fontFamily: 'Barlow, sans-serif', fontWeight: '800' }} 
                className="text-black px-6 py-3 rounded-lg w-32 text-center" 
                disabled={isGameOver} 
                onClick={handleGuess}>Guess</button>
                </div>
        </div>

        {<ClipGuessGrid guesses={guesses} targetClip={targetClip} />}

        {isGameOver && targetClip && <p className="text-center">Game over, the answer was S{targetClip.season}E{targetClip.episode}: {targetEpisodeName}</p>}
    </div>
);
}